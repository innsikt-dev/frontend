'use client'

import { usePageParams } from '@/hooks/use-page-params'
import { cn } from '@/lib/cn'
import { useEffect } from 'react'

const ranges = [
  {
    id: 1,
    range: '7d',
    label: '7 dager',
  },
  {
    id: 2,
    range: '30d',
    label: '30 dager',
  },
  {
    id: 3,
    range: '90d',
    label: '90 dager',
  },
  {
    id: 4,
    range: '365d',
    label: '1 år',
  },
]

export default function TimeRangePicker() {
  const { period, update } = usePageParams()
  useEffect(() => {
    if (!period) update({ period: '7d' })
  }, [period, update])
  return (
    <ul className="flex gap-4 border border-line   py-2 px-4 rounded-xl">
      {ranges.map((r) => (
        <button
          onClick={() => update({ period: r.range })}
          className={cn(
            'text-content-muted text-xs font-bold cursor-pointer hover:text-content duration-150 transition',
            { 'text-content': period === r.range }
          )}
          key={r.id}
        >
          {r.label}
        </button>
      ))}
    </ul>
  )
}
