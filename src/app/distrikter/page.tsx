import Chart from '@/components/chart'
import ChartWrapper from '@/components/chart/chart-wrapper'
import PageHeader from '@/components/page-header'
import Container from '@/components/wrappers/container'
import Section from '@/components/wrappers/section'
import { fetchDistrictsAnalytics } from '@/features/districts/api/fetch-districts-analytics'
import { fetchDistrictsKpi } from '@/features/districts/api/fetch-districts-kpi'
import { buildDistrictCategoryDistribution } from '@/features/districts/chart/options/build-district-category-distribution'
import { buildDistrictTrends } from '@/features/districts/chart/options/build-district-trends'
import DistrictKpi from '@/features/districts/components/district-kpi'

export default async function Page() {
  const kpi = await fetchDistrictsKpi()
  const analytics = await fetchDistrictsAnalytics()
  if (!kpi.success) throw new Error('Kan ikke laste data')
  if (!analytics.success) throw new Error('Kan ikke laste data')
  return (
    <Section className="flex flex-col">
      <Container>
        <PageHeader
          title="Politidistrikter"
          subtitle="Sammenlign aktivitet og hendelsesmønstre på tvers av alle politidistrikter"
        />
      </Container>

      <DistrictKpi data={kpi.data} />

      <ChartWrapper title="Ukentlige trender">
        <Chart option={buildDistrictTrends(analytics.data.trends)} />
      </ChartWrapper>

      <ChartWrapper title="Kategorifordeling">
        <Chart
          option={buildDistrictCategoryDistribution(
            analytics.data.categoryDistribution
          )}
        />
      </ChartWrapper>
    </Section>
  )
}
