export function Title({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-semibold text-content">{children}</h2>
}

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium text-content-muted uppercase tracking-wide">
      {children}
    </p>
  )
}

export function Meta({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-content-muted">{children}</p>
}
