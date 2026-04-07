import Chart from '@/components/chart'
import ChartWrapper from '@/components/chart/chart-wrapper'
import PageHeader from '@/components/page-header'
import Container from '@/components/wrappers/container'
import Section from '@/components/wrappers/section'
import { fetchAnalytics } from '@/features/analytics/api/fetch-analytics'
import HeatmapChart from '@/features/analytics/chart/heatmap'
import { buildAnalyticsCategoryDistribution } from '@/features/analytics/chart/options/build-analytics-category-distribution'
import { buildAnalyticsTopMunicipalities } from '@/features/analytics/chart/options/build-analytics-top-municipalities'
import { buildAnalyticsTrends } from '@/features/analytics/chart/options/build-analytics-trends'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analyse | Innsikt',
  description: 'All data over tid – mønstre og trender i politiloggen',
}

type Params = {
  searchParams: {
    period: string
  }
}
export default async function Page({ searchParams }: Params) {
  const { period } = await searchParams
  const analytics = await fetchAnalytics(period ?? '1d')
  if (!analytics.success) throw new Error('Kunne ikke laste data')
  return (
    <Section className="flex flex-col">
      <PageHeader
        title="Analyse"
        subtitle="Utforsk mønstre og trender i politiloggen over tid"
      />
      <ChartWrapper title="Aktivitet etter dag og time">
        <HeatmapChart data={analytics.data.heatMap} />
      </ChartWrapper>
      <ChartWrapper title="Hendelser over tid">
        <Chart option={buildAnalyticsTrends(analytics.data.trends)} />
      </ChartWrapper>
      <Container className="grid grid-cols-2 gap-4">
        <ChartWrapper title="Topp 10 kommuner">
          <Chart
            option={buildAnalyticsTopMunicipalities(
              analytics.data.topMunicipalities
            )}
          />
        </ChartWrapper>

        <ChartWrapper title="Fordeling av kategorier">
          <Chart
            option={buildAnalyticsCategoryDistribution(
              analytics.data.categoryDistribution
            )}
          />
        </ChartWrapper>
      </Container>
    </Section>
  )
}
