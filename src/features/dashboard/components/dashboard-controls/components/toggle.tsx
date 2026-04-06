import { cn } from '@/lib/cn'
import { LayoutGrid } from 'lucide-react'

export default function Toggle() {
  return (
    <button
      className={cn(
        'cursor-pointer bg-surface p-2 rounded-full shadow-xm border-line border'
      )}
    >
      <LayoutGrid size={16} />
    </button>
  )
}
