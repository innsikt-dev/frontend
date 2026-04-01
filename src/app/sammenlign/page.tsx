import { SelectMenu } from '@/features/comparison/components/select-menu'
import Container from '@/components/wrappers/container'
import Section from '@/components/wrappers/section'
import { fetchAnalytics } from '@/features/comparison/api/fetch-analytics'
import { fetchMunicipalities } from '@/features/comparison/api/fetch-municipalities'
import { fetchNames } from '@/features/kommunesok/api/fetch-names'
import TimeRangePicker from '@/components/time-range-picker'
import MunicipalityView from '@/features/kommunesok/components/municipality'
import MunicipalitiesView from '@/features/comparison/components/municipalities-view'

type Params = {
  searchParams: {
    municipality1: string
    municipality2: string
    period: string
  }
}
export default async function Page({ searchParams }: Params) {
  const { municipality1, municipality2, period } = await searchParams

  const analytics = await fetchAnalytics({
    id1: municipality1,
    id2: municipality2,
    period: period ?? '7d',
  })

  const municipalities = await fetchMunicipalities({
    id1: municipality1,
    id2: municipality2,
    period: period ?? '7d',
  })
  const availableMunicipalities = await fetchNames()
  if (!availableMunicipalities.success)
    throw new Error('Kunne ikke laste siden')
  if (!municipalities.success) throw new Error('Kunne ikke laste siden')
  return (
    <Section>
      <TimeRangePicker />
      <Container className="flex items-center gap-2">
        <SelectMenu
          data={availableMunicipalities.data}
          paramKey="municipality1"
        />
        <p className="text-xs font-semibold text-content-muted">vs</p>
        <SelectMenu
          data={availableMunicipalities.data}
          paramKey="municipality2"
        />
      </Container>

      <Container>
        <MunicipalitiesView />
      </Container>
    </Section>
  )
}
