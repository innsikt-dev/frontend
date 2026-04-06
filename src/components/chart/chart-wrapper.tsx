import Container from '../wrappers/container'

type Props = {
  title: string
  children: React.ReactNode
  className?: string
}

export default function ChartWrapper({ children, title }: Props) {
  return (
    <Container className="my-4 mb-16  bg-surface-card/35 py-4 px-4 border border-line/50 rounded-lg">
      <p className="text-content-muted font-bold">{title}</p>
      {children}
    </Container>
  )
}
