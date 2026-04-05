import PageHeader from '@/components/page-header'
import Section from '@/components/wrappers/section'
import { fetchDistrictsKpi } from '@/features/districts/api/fetch-districts-kpi'
import DistrictKpi from '@/features/districts/components/district-kpi'

export default async function Page() {
  const kpi = await fetchDistrictsKpi()
  if (!kpi.success) throw new Error('Kan ikke laste data')
  return (
    <Section>
      <PageHeader
        title="Politidistrikter"
        subtitle="Sammenlign aktivitet og hendelsesmønstre på tvers av alle politidistrikter"
      />

      <DistrictKpi data={kpi.data} />
    </Section>
  )
}
