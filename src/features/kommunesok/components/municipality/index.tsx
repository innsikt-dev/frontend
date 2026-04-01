import Container from '@/components/wrappers/container'
import { MunicipalityData } from '../../api/types'
import TimeRangePicker from '@/components/time-range-picker'

type Props = {
  data: MunicipalityData
}
export default function MunicipalityView({ data }: Props) {
  return (
    <>
      <Container className="flex justify-between gap-8 w-full">
        <Container className="flex items-center gap-8">
          <Container className="flex items-center gap-1">
            <span className="kpi-label uppercase">totalt</span>
            <span className="kpi-value">{data.kpi.incidents[0].amount}</span>
          </Container>
          <Container className="flex items-center  gap-1">
            <span className="kpi-label uppercase">dager med data</span>
            <span className="kpi-value">{data.kpi.datasetDays[0].amount}</span>
          </Container>
          <Container className="flex items-center  gap-1">
            <span className="kpi-label uppercase">vanligste kategori</span>
            <span className="kpi-value">
              {data.kpi.commonCategory[0].category}
            </span>
          </Container>
        </Container>
        <TimeRangePicker />
      </Container>
    </>
  )
}
