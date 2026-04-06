import Container from '@/components/wrappers/container'
import { MunicipalityKpi } from '../../api/types'

type Props = {
  data: MunicipalityKpi
}
export default function ExploreKpi({ data }: Props) {
  return (
    <Container className="flex flex-col items-start border rounded-lg border-line/50 py-4 px-4 w-full">
      <span className="text-xs font-bold mb-1">{data.municipality_name}</span>
      <span className="kpi-value text-lg">{data.total_incidents}</span>
      <span className="text-xs text-content-muted">{data.district_name}</span>
      <span className="text-xs text-content-muted italic">
        {data.most_common_category}
      </span>
    </Container>
  )
}
