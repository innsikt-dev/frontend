import Chart from '@/components/chart'
import ChartWrapper from '@/components/chart/chart-wrapper'
import Container from '@/components/wrappers/container'
import Section from '@/components/wrappers/section'
import { fetchAnalytics } from '@/features/kommunesok/api/fetch-analytics'
import { fetchMunicipalityData } from '@/features/kommunesok/api/fetch-municipality'
import { fetchNames } from '@/features/kommunesok/api/fetch-names'
import { buildCategoryDistribution } from '@/features/kommunesok/chart/options/build-category-distribution'
import { buildIncidentsOverTime } from '@/features/kommunesok/chart/options/build-incidents-over-time'

import MunicipalityView from '@/features/kommunesok/components/municipality'
import Sidebar from '@/features/kommunesok/components/sidebar'
import PageHeader from '@/components/page-header'
import Events from '@/features/kommunesok/components/municipality-events'
import { appConfig } from '@/lib/app-config/config'
type Params = {
  searchParams: {
    period: string
    municipality: string
  }
}
export default async function Page({ searchParams }: Params) {
  const { period, municipality } = await searchParams
  const municipalities = await fetchNames()
  if (!municipalities.success) throw new Error('Kunne ikke laste data')
  const municipalityData = await fetchMunicipalityData(
    municipality ?? appConfig.defaults.municipality1
  )
  if (!municipalityData.success) throw new Error('Kunne ikke laste data')
  const analytics = await fetchAnalytics(municipality ?? 'Oslo', period ?? '7d')
  if (!analytics.success) throw new Error('Kunne ikke laste data')
  return (
    <Section className="flex h-[92vh]">
      <Sidebar data={municipalities.data} />
      <Container className="flex flex-col gap-4  px-12 grow mx-auto  overflow-y-auto">
        <PageHeader
          title={municipalityData.data.municipality.municipality_name}
          subtitle={municipalityData.data.municipality.district_name}
        />
        <MunicipalityView data={municipalityData.data} />
        <Container>
          <ChartWrapper title="Hendelser over tid">
            <Chart
              option={buildIncidentsOverTime(analytics.data.incidentsOverTime)}
            />
          </ChartWrapper>
          <ChartWrapper title="Kategorifordeling">
            <Chart
              option={buildCategoryDistribution(
                analytics.data.categoryDistribution
              )}
            />
          </ChartWrapper>
          <Events data={analytics.data.events} />
        </Container>
      </Container>
    </Section>
  )
}
