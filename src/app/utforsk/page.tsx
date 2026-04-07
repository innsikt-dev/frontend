import { SelectMenu } from '@/features/explore/components/select-menu'
import Container from '@/components/wrappers/container'
import Section from '@/components/wrappers/section'
import { fetchAnalytics } from '@/features/explore/api/fetch-analytics'
import { fetchComparisonKPI } from '@/features/explore/api/fetch-comparison-kpi'
import { fetchMunicipalitiesNames } from '@/features/explore/api/fetch-municipalities-names'
import ChartWrapper from '@/components/chart/chart-wrapper'
import Chart from '@/components/chart'
import { buildCategoryDistribution } from '@/features/explore/chart/options/build-category-distribution'
import { appConfig } from '@/lib/app-config/config'
import PageHeader from '@/components/page-header'
import ExploreKpi from '@/features/explore/components/kpi'
import { buildIncidentsOverTime } from '@/features/explore/chart/options/build-incidents-over-time'
import { Metadata } from 'next'
import PerInhabitant from '@/features/explore/components/per-inhabitant'

export const metadata: Metadata = {
  title: 'Utforsk | Innsikt',
  description: 'Sammenlign kommuner mot hverandre',
}

type Params = {
  searchParams: {
    municipality1: string
    municipality2: string
    period: string
    perCapita: string
  }
}
export default async function Page({ searchParams }: Params) {
  const { municipality1, municipality2, period, perCapita } = await searchParams
  const m1 = municipality1 ?? appConfig.defaults.municipality1
  const m2 = municipality2 ?? appConfig.defaults.municipality2

  const analytics = await fetchAnalytics({
    id1: m1,
    id2: m2,
    period: period ?? appConfig.defaults.period,
    perCapita,
  })
  if (!analytics.success) throw new Error('Kunne ikke laste siden')
  const comparisonKpi = await fetchComparisonKPI({
    id1: m1,
    id2: m2,
    period: period ?? appConfig.defaults.period,
  })
  const availableMunicipalities = await fetchMunicipalitiesNames()
  if (!availableMunicipalities.success)
    throw new Error('Kunne ikke laste siden')
  if (!comparisonKpi.success) throw new Error('Kunne ikke laste siden')

  return (
    <Section className="flex flex-col">
      <Container className="flex flex-col gap-4  items-center gap-2 w-full">
        <PageHeader
          title="Sammenlign kommuner"
          subtitle="Sammenlign hendelsesdata mellom to kommuner"
        />
        <Container className="flex  gap-4 items-center w-full">
          <SelectMenu
            data={availableMunicipalities.data}
            paramKey="municipality1"
          />
          <p className="text-xs font-semibold text-content-muted">vs</p>
          <SelectMenu
            data={availableMunicipalities.data}
            paramKey="municipality2"
          />
          <PerInhabitant />
        </Container>
      </Container>

      <Container className="flex gap-12">
        <ExploreKpi data={comparisonKpi.data.municipalityOne} />
        <ExploreKpi data={comparisonKpi.data.municipalityTwo} />
      </Container>

      <ChartWrapper title="Hendelser over tid">
        <Chart
          option={buildIncidentsOverTime(
            analytics.data.incidentsOverTime,
            m1,
            m2
          )}
        />
      </ChartWrapper>
      <ChartWrapper title="Kategorifordeling">
        <Chart
          option={buildCategoryDistribution(
            analytics.data.keywordIncidents,
            m1,
            m2
          )}
        />
      </ChartWrapper>
    </Section>
  )
}
