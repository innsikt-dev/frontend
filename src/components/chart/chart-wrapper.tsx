import Container from '../wrappers/container'

type Props = {
  title: string
  children: React.ReactNode
  className?: string
}

export default function ChartWrapper({ children, title }: Props) {
  return (
    <Container className="py-3">
      <p className="flex items-center gap-2 text-base  text-content">
        <span>{title}</span>
      </p>
      {children}
    </Container>
  )
}
