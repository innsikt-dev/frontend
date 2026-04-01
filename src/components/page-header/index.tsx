export default function PageHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <h1 className="flex flex-col">
      <span className="text-content text-lg font-bold">{title}</span>
      {subtitle && (
        <span className="text-sm text-content-muted">{subtitle}</span>
      )}
    </h1>
  )
}
