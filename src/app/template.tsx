// Remounts on every navigation, replaying a CSS fade-in (works before hydration too).
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-in duration-500 fade-in-0 slide-in-from-bottom-2 motion-reduce:animate-none">
      {children}
    </div>
  )
}
