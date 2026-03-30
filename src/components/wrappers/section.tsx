import { cn } from '@/lib/cn'

export default function Section({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <section className={cn(className, 'px-3')}>{children}</section>
}
