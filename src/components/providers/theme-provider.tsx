"use client"

import * as React from "react"

export type Theme = "light" | "dark" | "system"
type ResolvedTheme = "light" | "dark"

const STORAGE_KEY = "theme"
const MEDIA = "(prefers-color-scheme: dark)"

// Runs in <head> before first paint so the correct theme is applied with no flash.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");var d=t==="dark"||((t!=="light")&&window.matchMedia("${MEDIA}").matches);var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light"}catch(_){}})()`

const listeners = new Set<() => void>()

function readTheme(): Theme {
  try {
    const t = localStorage.getItem(STORAGE_KEY)
    return t === "light" || t === "dark" ? t : "system"
  } catch {
    return "system"
  }
}

function resolve(theme: Theme): ResolvedTheme {
  if (theme !== "system") return theme
  return window.matchMedia(MEDIA).matches ? "dark" : "light"
}

function applyTheme(disableTransitions = false) {
  const resolved = resolve(readTheme())
  const root = document.documentElement

  let style: HTMLStyleElement | undefined
  if (disableTransitions) {
    style = document.createElement("style")
    style.textContent = "*,*::before,*::after{transition:none!important}"
    document.head.appendChild(style)
  }

  root.classList.toggle("dark", resolved === "dark")
  root.style.colorScheme = resolved

  if (style) {
    // Force a reflow so the new colors apply before transitions are restored
    void window.getComputedStyle(document.body).opacity
    const el = style
    requestAnimationFrame(() => el.remove())
  }
}

function notify() {
  listeners.forEach((l) => l())
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  const mq = window.matchMedia(MEDIA)
  const onSystemChange = () => {
    applyTheme(true)
    callback()
  }
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      applyTheme(true)
      callback()
    }
  }
  mq.addEventListener("change", onSystemChange)
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(callback)
    mq.removeEventListener("change", onSystemChange)
    window.removeEventListener("storage", onStorage)
  }
}

// Snapshot is a primitive string so useSyncExternalStore can compare it cheaply
function getSnapshot() {
  const theme = readTheme()
  return `${theme}:${resolve(theme)}`
}

function getServerSnapshot() {
  return "system:light"
}

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const snapshot = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [theme, resolvedTheme] = snapshot.split(":") as [Theme, ResolvedTheme]

  // React's dev Strict Mode remount resets <html> attributes; re-apply before paint.
  React.useLayoutEffect(() => {
    applyTheme()
  }, [])

  const setTheme = React.useCallback((next: Theme) => {
    try {
      if (next === "system") localStorage.removeItem(STORAGE_KEY)
      else localStorage.setItem(STORAGE_KEY, next)
    } catch {}
    applyTheme(true)
    notify()
  }, [])

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
