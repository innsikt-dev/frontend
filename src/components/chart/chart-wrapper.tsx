import Container from '../wrappers/container'

type Props = {
  title: string
  children: React.ReactNode
  className?: string
}

export default function ChartWrapper({ children, title }: Props) {
  return (
    <Container className="mb-16 py-3 bg-surface-card/35 py-4 px-2">
      <p className="text-content-muted font-bold">{title}</p>
      {children}
    </Container>
  )
}
