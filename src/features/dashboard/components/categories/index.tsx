'use client'
import { categoryColorHex } from '@/lib/category-map'
import { cn } from '@/lib/cn'
import { DashboardCategories } from '../../api/types'
import { useMapParams } from '@/hooks/use-map-params'

type Props = {
  data: DashboardCategories[]
}
export default function Categories({ data }: Props) {
  const { category, update } = useMapParams()

  return (
    <ul className="flex flex-wrap gap-5">
      {data.map((d, i) => {
        const categoryColor = categoryColorHex[d.category] ?? '#6b7280'
        return (
          <li
            onClick={() => update({ category: d.category, thread: null })}
            className={cn(
              'flex items-center gap-2 text-content-muted bg-surface text-xs rounded-lg border border-line px-4'
            )}
            key={i}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: categoryColor }}
            />
            <span> {d.category}</span>
            <span className="text-content">{d.amount}</span>
            {category === d.category && <p>lukk</p>}
          </li>
        )
      })}
    </ul>
  )
}
