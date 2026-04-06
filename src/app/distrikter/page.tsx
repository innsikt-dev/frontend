import Chart from '@/components/chart'
import ChartWrapper from '@/components/chart/chart-wrapper'
import PageHeader from '@/components/page-header'
import SseListener from '@/components/sse'
import Container from '@/components/wrappers/container'
import Section from '@/components/wrappers/section'
import { fetchDistrictsAnalytics } from '@/features/districts/api/fetch-districts-analytics'
import { fetchDistrictsKpi } from '@/features/districts/api/fetch-districts-kpi'
import { buildDistrictCategoryDistribution } from '@/features/districts/chart/options/build-district-category-distribution'
import { buildDistrictTrends } from '@/features/districts/chart/options/build-district-trends'
import DistrictKpi from '@/features/districts/components/district-kpi'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Distrikter | Innsikt',
  description: 'Oversikt over alle politidistrikter',
}

type Params = {
  searchParams: {
    period: string
    district: string
  }
}
export default async function Page({ searchParams }: Params) {
  const { period, district } = await searchParams
  const kpi = await fetchDistrictsKpi()
  const analytics = await fetchDistrictsAnalytics({ district, period })
  if (!kpi.success) throw new Error('Kan ikke laste data')
  if (!analytics.success) throw new Error('Kan ikke laste data')
  return (
    <Section className="flex flex-col">
      <SseListener />
      <Container>
        <PageHeader
          title="Politidistrikter"
          subtitle="Sammenlign aktivitet og hendelsesmønstre på tvers av alle politidistrikter"
        />
      </Container>

      <DistrictKpi data={kpi.data} />

      <ChartWrapper title="Trender">
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
