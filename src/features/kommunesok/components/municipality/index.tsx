import Container from '@/components/wrappers/container'
import { MunicipalityData } from '../../api/types'
import TimeRangePicker from '@/components/time-range-picker'
import { Label, Value } from '@/components/typography'

type Props = {
  data: MunicipalityData
}
export default function MunicipalityView({ data }: Props) {
  return (
    <>
      <Container className="flex justify-between gap-8 w-full">
        <Container className="flex items-center gap-8">
          <Container className="flex items-center gap-1">
            <Label>totalt</Label>
            <Value>{data.kpi.incidents[0].amount}</Value>
          </Container>

          <Container className="flex items-center  gap-1">
            <Label>vanligste kategori</Label>
            <Value>{data.kpi.commonCategory[0].category}</Value>
          </Container>
        </Container>
        <TimeRangePicker />
      </Container>
    </>
  )
}
