'use client'
import { MapPin, Clock } from 'lucide-react'
import { DashboardEvent } from '../../api/types'
import { categoryMap } from '@/lib/category-map'
import { timeAgo } from '@/lib/time-ago'

export default function Events({ data }: { data: DashboardEvent[] }) {
  return (
    <ul className="w-[30%]">
      {data.map((d) => (
        <li
          key={d.id}
          className="flex flex-col gap-2 p-4 border-b border-line cursor-pointer hover:bg-surface-subtle duration-150"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span
              className={`text-xs font-semibold uppercase tracking-wide ${categoryMap[d.type]?.color ?? 'text-content-muted'}`}
            >
              {d.type}
            </span>
          </div>
          <p className="text-sm leading-snug line-clamp-3 text-content">
            {d.text}
          </p>
          <div className="flex items-center gap-3 text-xs text-content-subtle">
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {d.municipality_name}
              {d.area ? `, ${d.area}` : ''}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {timeAgo(d.created_on)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
