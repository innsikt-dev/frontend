import Chart from '@/components/chart'
import ChartWrapper from '@/components/chart/chart-wrapper'
import PageHeader from '@/components/page-header'
import Container from '@/components/wrappers/container'
import Section from '@/components/wrappers/section'
import { fetchAnalytics } from '@/features/analytics/api/fetch-analytics'
import HeatmapChart from '@/features/analytics/chart/heatmap'
import { buildCategoryDistribution } from '@/features/analytics/chart/options/build-category-distribution'
import { buildTopMunicipalities } from '@/features/analytics/chart/options/build-top-municipalities'
import { buildTrends } from '@/features/analytics/chart/options/build-trends'
type Params = {
  searchParams: {
    period: string
  }
}
export default async function Page({ searchParams }: Params) {
  const { period } = await searchParams
  const data = await fetchAnalytics(period ?? '1d')
  if (!data.success) return null
  return (
    <Section className="flex flex-col">
      <PageHeader
        title="Analyse"
        subtitle="Utforsk mønstre og trender i politiloggen over tid"
      />
      <ChartWrapper title="Aktivitet etter dag og time">
        <HeatmapChart data={data.data.heatMap} />
      </ChartWrapper>
      <ChartWrapper title="Hendelser over tid">
        <Chart option={buildTrends(data.data.trends)} />
      </ChartWrapper>
      <Container className="grid grid-cols-2 gap-4">
        <ChartWrapper title="Topp 10 kommuner">
          <Chart option={buildTopMunicipalities(data.data.topMunicipalities)} />
        </ChartWrapper>

        <ChartWrapper title="Fordeling av kategorier">
          <Chart
            option={buildCategoryDistribution(data.data.categoryDistribution)}
          />
        </ChartWrapper>
      </Container>
    </Section>
  )
}
