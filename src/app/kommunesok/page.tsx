import Container from '@/components/wrappers/container'
import Section from '@/components/wrappers/section'
import { fetchMunicipalityData } from '@/features/kommunesok/api/fetch-municipality'
import { fetchNames } from '@/features/kommunesok/api/fetch-names'
import MunicipalityView from '@/features/kommunesok/components/municipality'
import Sidebar from '@/features/kommunesok/components/sidebar'
type Params = {
  searchParams: {
    municipality: string
  }
}
export default async function Page({ searchParams }: Params) {
  const { municipality } = await searchParams
  const municipalities = await fetchNames()
  if (!municipalities.success) return null
  const analytics = await fetchMunicipalityData(municipality ?? 'Oslo')
  if (!analytics.success) return null
  return (
    <Section className="flex">
      <Sidebar data={municipalities.data} />
      <Container className="flex flex-col gap-4 max-w-5xl grow mx-auto">
        <MunicipalityView data={analytics.data} />
      </Container>
    </Section>
  )
}
