import TimeRangePicker from '../time-range-picker'
import Container from '../wrappers/container'

export default function PageHeader({
  title,
  subtitle,
  showRange = true,
}: {
  title: string
  subtitle?: string
  showRange?: boolean
}) {
  return (
    <Container className="flex justify-between items-center w-full items-end">
      <Container>
        <h1 className="flex flex-col">
          <span className="text-content text-lg font-bold">{title}</span>
          {subtitle && (
            <span className="text-sm text-content-muted">{subtitle}</span>
          )}
        </h1>
      </Container>
      {showRange && <TimeRangePicker />}
    </Container>
  )
}
