import Chart from '@/components/chart'
import ChartWrapper from '@/components/chart/chart-wrapper'
import Container from '@/components/wrappers/container'
import Section from '@/components/wrappers/section'
import { fetchAnalytics } from '@/features/analytics/api/fetch-analytics'
import HeatmapChart from '@/features/chart/heatmap'
import { buildCategoryDistribution } from '@/features/chart/options/build-category-distribution'
import { buildTopMunicipalities } from '@/features/chart/options/build-top-municipalities'
import { buildTrends } from '@/features/chart/options/build-trends'

export default async function Page() {
  const data = await fetchAnalytics('')
  if (!data.success) return null
  return (
    <Section>
      <ChartWrapper title="Aktivitet etter dag og time">
        <HeatmapChart data={data.data.heatMap} />
      </ChartWrapper>
      <ChartWrapper title="Hendelser per kategori">
        <Chart option={buildTrends(data.data.trends)} />
      </ChartWrapper>

      <Container className="grid grid-cols-2">
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
