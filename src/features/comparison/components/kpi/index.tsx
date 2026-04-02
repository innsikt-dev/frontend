import Container from '@/components/wrappers/container'
import { ComparisonKpi } from '../../api/types'
import { Label, Subtitle, Title, Value } from '@/components/typography'

type Props = {
  data: ComparisonKpi
}
export default function ComparisonKPI({ data }: Props) {
  return (
    <Container className="flex flex-col gap-4">
      <Container className="flex flex-col">
        <Title>{data.municipality_name}</Title>
        <Subtitle>{data.district_name}</Subtitle>
      </Container>
      <Container className="flex gap-4">
        <Container className="flex items-center gap-1">
          <Label>hendelser</Label>
          <Value>{data.total_incidents}</Value>
        </Container>
        <Container className="flex items-center gap-1">
          <Label>vanligst</Label>
          <Value>{data.most_common_category}</Value>
        </Container>
        <Container className="flex items-center gap-1">
          <Label>per dag</Label>
          <Value>{data.avg_per_day}</Value>
        </Container>
      </Container>
    </Container>
  )
}
