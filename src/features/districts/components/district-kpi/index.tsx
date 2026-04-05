import { cn } from '@/lib/cn'
import { DistrictKPI } from '../../api/types'
import { districtColors } from '@/lib/district-map'

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
