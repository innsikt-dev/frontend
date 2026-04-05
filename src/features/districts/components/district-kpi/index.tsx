import { cn } from '@/lib/cn'
import { DistrictKPI } from '../../api/types'

const districtColors: Record<string, { color: string; colorHex: string }> = {
  'oslo politidistrikt': { color: 'bg-pink-400', colorHex: '#ec4899' },
  'øst politidistrikt': { color: 'bg-blue-500', colorHex: '#3b82f6' },
  'innlandet politidistrikt': { color: 'bg-red-500', colorHex: '#ef4444' },
  'sør-øst politidistrikt': { color: 'bg-emerald-500', colorHex: '#10b981' },
  'sør-vest politidistrikt': { color: 'bg-cyan-500', colorHex: '#06b6d4' },
  'vest politidistrikt': { color: 'bg-teal-500', colorHex: '#14b8a6' },
  'møre og romsdal politidistrikt': {
    color: 'bg-green-500',
    colorHex: '#22c55e',
  },
  'trøndelag politidistrikt': { color: 'bg-yellow-500', colorHex: '#eab308' },
  'nordland politidistrikt': { color: 'bg-purple-500', colorHex: '#a855f7' },
  'troms politidistrikt': { color: 'bg-amber-500', colorHex: '#f59e0b' },
  'finnmark politidistrikt': { color: 'bg-orange-500', colorHex: '#f97316' },
  'agder politidistrikt': { color: 'bg-indigo-500', colorHex: '#6366f1' },
}

type Props = {
  data: DistrictKPI[]
}
export default function DistrictKpi({ data }: Props) {
  return (
    <ul className="grid grid-cols-4 gap-x-5 gap-y-4">
      {data.map((data, i) => (
        <li key={`${data.district_name}-${i}`}>
          <button className="flex flex-col items-start w-full border rounded-lg border-line/50 py-4 px-4 hover:border-line hover:shadow-xs duration-100 cursor-pointer">
            {' '}
            <span className="flex gap-1 items-center text-xs font-bold mb-1">
              <span
                className={cn(
                  'w-2 h-2 block rounded-full',
                  districtColors[data.district_name.toLowerCase()].color
                )}
              ></span>
              <span> {data.district_name}</span>
            </span>
            <span className="kpi-value text-lg">{data.total_incidents}</span>
            <span className="text-xs text-content-muted">
              <span>{data.active ?? 0}</span> <span>aktive</span>
            </span>
            <span className="text-xs text-content-muted italic">
              {data.top_category}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
