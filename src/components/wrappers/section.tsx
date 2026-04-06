import { cn } from '@/lib/utils'

export default function Section({
  children,
  className,
  fullWidth = false,
}: {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
}) {
  return (
    <section
      className={cn(
        'gap-12',
        fullWidth ? 'px-3' : 'max-w-7xl w-full mx-auto py-4',
        className
      )}
    >
      {children}
    </section>
  )
}
