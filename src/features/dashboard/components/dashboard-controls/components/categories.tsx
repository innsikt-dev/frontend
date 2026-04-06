'use client'
import { categoryColorHex } from '@/lib/category-map'
import { cn } from '@/lib/cn'
import { useMapParams } from '@/hooks/use-map-params'
import { DashboardCategory } from '@/features/dashboard/api/types'
import { Info, X } from 'lucide-react'
import Container from '@/components/wrappers/container'
type Props = {
  data: DashboardCategory[]
}
export default function DashboardCategories({ data }: Props) {
  const { category, update } = useMapParams()

  function setCategory(input: string) {
    if (!input) return
    if (input !== category) {
      update({ category: input, thread: null })
    } else if (input === category) {
      update({ category: null, thread: null })
    }
  }
  return (
    <Container>
      <p className="flex items-center gap-1 italic text-xs  my-2 text-content-muted">
        <Info size={12} />
        <span>Trykk en kategori for å filtrere</span>
      </p>
      <ul className="flex flex-col gap-1 items-start">
        {data.map((d, i) => {
          const categoryColor = categoryColorHex[d.category] ?? '#6b7280'
          return (
            <li
              onClick={() => setCategory(d.category)}
              className={cn(
                'flex items-center justify-between w-full gap-2 text-content-muted  text-xs cursor-pointer px-1 hover:bg-surface'
              )}
              key={i}
            >
              <p className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: categoryColor }}
                />
                <span> {d.category}</span>
              </p>

              <span className="text-content">
                {category === d.category ? <X size={12} /> : d.amount}
              </span>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}
