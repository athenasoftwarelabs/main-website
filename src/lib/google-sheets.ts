import "server-only"
import { createSign } from "node:crypto"

// Minimal Google Sheets client using a service account (no SDK needed).
// Setup steps are in the README under "Contact form → Google Sheets".

const TOKEN_URL = "https://oauth2.googleapis.com/token"
const SHEETS_URL = "https://sheets.googleapis.com/v4/spreadsheets"
const SCOPE = "https://www.googleapis.com/auth/spreadsheets"

export class SheetsConfigError extends Error {}

function getConfig() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  // Hosting dashboards usually store the key on one line with literal "\n" sequences
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
  const spreadsheetId = process.env.GOOGLE_SHEET_ID
  const tab = process.env.GOOGLE_SHEET_TAB || "Sheet1"

  if (!email || !privateKey || !spreadsheetId) {
    throw new SheetsConfigError(
      "Google Sheets is not configured. Set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY and GOOGLE_SHEET_ID."
    )
  }
  return { email, privateKey, spreadsheetId, tab }
}

const base64url = (input: string) => Buffer.from(input).toString("base64url")

// Access tokens last an hour; reuse one per server instance until shortly before it expires
let cachedToken: { value: string; expiresAt: number } | null = null

async function getAccessToken(email: string, privateKey: string) {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value

  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))
  const claims = base64url(
    JSON.stringify({ iss: email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 })
  )
  const signature = createSign("RSA-SHA256").update(`${header}.${claims}`).sign(privateKey, "base64url")

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${signature}`,
    }),
    cache: "no-store",
  })
  if (!res.ok) throw new Error(`Google auth failed (${res.status}): ${await res.text()}`)

  const data = (await res.json()) as { access_token: string; expires_in: number }
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 }
  return data.access_token
}

async function sheetsRequest(path: string, token: string, init?: RequestInit) {
  const res = await fetch(`${SHEETS_URL}/${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    cache: "no-store",
  })
  if (!res.ok) throw new Error(`Google Sheets request failed (${res.status}): ${await res.text()}`)
  return res.json()
}

// Writes the header row the first time this server instance sees an empty sheet
let headerChecked = false

async function ensureHeader(spreadsheetId: string, tab: string, token: string, header: string[]) {
  if (headerChecked) return
  const range = encodeURIComponent(`'${tab}'!A1:1`)
  const existing = (await sheetsRequest(`${spreadsheetId}/values/${range}`, token)) as { values?: string[][] }
  if (!existing.values?.length) {
    await sheetsRequest(`${spreadsheetId}/values/${range}?valueInputOption=RAW`, token, {
      method: "PUT",
      body: JSON.stringify({ values: [header] }),
    })
  }
  headerChecked = true
}

/** Appends one row to the configured sheet tab, adding `header` first if the sheet is empty. */
export async function appendRow(header: string[], row: string[]) {
  const { email, privateKey, spreadsheetId, tab } = getConfig()
  const token = await getAccessToken(email, privateKey)
  await ensureHeader(spreadsheetId, tab, token, header)

  const range = encodeURIComponent(`'${tab}'!A1`)
  // RAW (not USER_ENTERED) so visitor input like "=IMPORTXML(...)" is stored as text, never run as a formula
  await sheetsRequest(
    `${spreadsheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    token,
    { method: "POST", body: JSON.stringify({ values: [row] }) }
  )
}
