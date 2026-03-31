'use client'
import Container from '@/components/wrappers/container'
import { Thread } from '../../api/types'
import { categoryColorHex } from '@/lib/category-map'
import { timeAgo } from '@/lib/time-ago'
import { MapPin, Clock, X } from 'lucide-react'
import { useMapParams } from '@/hooks/use-map-params'

type Props = {
  data: Thread[] | null
}

export default function Threads({ data }: Props) {
  const { category, update } = useMapParams()
  const firstThread = data && data.length > 0

  const sliced = data?.slice(1)
  return (
    <Container className="h-full w-[400px] flex flex-col border-l border-line overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-line">
        <span className="text-xs uppercase tracking-widest text-content-subtle">
          Hendelseslogg
        </span>
        <button
          onClick={() => update({ category: category ?? null, thread: null })}
          className="text-content-subtle hover:text-content duration-150 cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      <ul className="overflow-y-auto flex-1">
        {firstThread && (
          <li
            key={`${data[0].id}`}
            className="p-4 border-b border-line flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: categoryColorHex[data[0].type] ?? '#6b7280',
                  }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-wide"
                  style={{ color: categoryColorHex[data[0].type] ?? '#6b7280' }}
                >
                  {data[0].type}
                </span>
              </div>
              {data[0].is_active && (
                <span className="flex items-center gap-1 text-xs text-green-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Aktiv
                </span>
              )}
            </div>

            <p className="text-sm text-content leading-snug">{data[0].text}</p>

            <div className="flex items-center gap-3 text-xs text-content-subtle">
              <span className="flex items-center gap-1">
                <MapPin size={11} />
                {data[0].municipality_name}
                {data[0].area ? `, ${data[0].area}` : ''}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {timeAgo(data[0].created_on)}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-content-subtle font-mono">
              <span>
                {data[0].lat.toFixed(4)}, {data[0].lng.toFixed(4)}
              </span>
            </div>
          </li>
        )}
        {sliced &&
          sliced?.length > 0 &&
          sliced.map((d, i) => (
            <li
              className="p-4 border-b border-line flex flex-col gap-2"
              key={`${d.id}-${i}`}
            >
              <p className="text-sm text-content leading-snug">{d.text}</p>
              <span className="flex items-center gap-3 text-xs text-content-subtle">
                <Clock size={11} />
                {timeAgo(d.created_on)}
              </span>
            </li>
          ))}
      </ul>
    </Container>
  )
}
