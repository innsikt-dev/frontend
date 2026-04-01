import { SelectMenu } from '@/features/comparison/components/select-menu'
import Container from '@/components/wrappers/container'
import Section from '@/components/wrappers/section'
import { fetchAnalytics } from '@/features/comparison/api/fetch-analytics'
import { fetchComparisonKPI } from '@/features/comparison/api/fetch-comparison-kpi'
import { fetchNames } from '@/features/kommunesok/api/fetch-names'
import TimeRangePicker from '@/components/time-range-picker'
import Kpi from '@/features/comparison/components/kpi'
import ChartWrapper from '@/components/chart/chart-wrapper'
import Chart from '@/components/chart'
import { buildComparisonIncidentsOverTime } from '@/features/comparison/chart/options/build-incidents-over-time'
import { buildComparisonCategoryDistribution } from '@/features/comparison/chart/options/build-category-distribution'
import { appConfig } from '@/lib/app-config/config'
import PageHeader from '@/components/page-header'

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
    period: period ?? appConfig.defaults.period,
  })

  const comparisonKpi = await fetchComparisonKPI({
    id1: municipality1,
    id2: municipality2,
    period: period ?? appConfig.defaults.period,
  })
  const availableMunicipalities = await fetchNames()
  if (!availableMunicipalities.success)
    throw new Error('Kunne ikke laste siden')
  if (!comparisonKpi.success) throw new Error('Kunne ikke laste siden')

  return (
    <Section className="flex flex-col max-w-7xl w-full mx-auto  gap-20 py-5">
      <Container className="flex flex-col gap-4  items-center gap-2 w-full">
        <Container className="mb-4 self-start">
          <PageHeader
            title="Sammenlign kommuner"
            subtitle="Sammenlign hendelsesdata mellom to kommuner"
          />
        </Container>
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
          <Container className="ml-auto">
            <TimeRangePicker />
          </Container>
        </Container>
      </Container>

      <Container className="flex gap-8">
        <Kpi data={comparisonKpi.data.municipalityOne} />
        <Kpi data={comparisonKpi.data.municipalityTwo} />
      </Container>

      {analytics.success && (
        <>
          <ChartWrapper title="">
            <Chart
              option={buildComparisonIncidentsOverTime(
                analytics.data.incidentsOverTime,
                municipality1,
                municipality2
              )}
            />
          </ChartWrapper>
          <ChartWrapper title="">
            <Chart
              option={buildComparisonCategoryDistribution(
                analytics.data.keywordIncidents,
                municipality1,
                municipality2
              )}
            />
          </ChartWrapper>
        </>
      )}
    </Section>
  )
}
