import Container from '@/components/wrappers/container'
import { Events } from '../../api/types'
import { MapPin, Clock } from 'lucide-react'
import { norwegianDateFormatter } from '@/lib/norwegian-date-formatter'
import { categoryMap } from '@/lib/category-map'
import { cn } from '@/lib/cn'
import { timeAgo } from '@/lib/time-ago'
type Props = {
  data: Events[]
}
export default function MunicipalityEvents({ data }: Props) {
  return (
    <Container className="flex flex-col gap-4">
      <h3 className="text-bold">Siste hendelser</h3>
      <ul className="flex flex-col gap-4">
        {data.map((d, i) => {
          const categoryColor = categoryMap[d.category]
          return (
            <li className="border-b border-line/50 pb-2" key={i}>
              <Container className="flex justify-between">
                <p
                  className={cn(
                    'uppercase text-xs font-semibold tracking-tight mb-2',
                    categoryColor?.color
                  )}
                >
                  {d.category}
                </p>
                <span className="text-xs text-content-subtle font-semibold">
                  {norwegianDateFormatter(d.date)}
                </span>
              </Container>
              <p className="text-xs text-content-muted font-semibold leading-relaxed">
                {d.text}
              </p>
              <Container className="flex gap-4 text-content-muted text-xs font-semibold">
                <Container className="flex gap-1 items-center">
                  <Clock size={12} />
                  <span>{timeAgo(d.date)}</span>
                </Container>
                <Container className="flex gap-1 items-center">
                  <MapPin size={12} />
                  <span>{d.district_name}</span>
                </Container>
              </Container>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}
