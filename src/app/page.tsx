import MapClient from '@/components/map'
import Container from '@/components/wrappers/container'
import Section from '@/components/wrappers/section'
import { fetchDashboardData } from '@/features/dashboard/api/fetch-dashboard-data'
import Events from '@/features/dashboard/components/events'
import Threads from '@/features/dashboard/components/threads'
import { categoryColorHex } from '@/lib/category-map'

export default async function Page() {
  const dashboardData = await fetchDashboardData()
  if (!dashboardData.success) return null

  return (
    <Section className="h-[90vh] py-2">
      <Container className="flex h-full">
        <Events data={dashboardData.data.events} />
        <Threads />
        <Container className="grow">
          <MapClient
            markers={dashboardData.data.events.map((e) => ({
              lat: e.lat ?? 0,
              lng: e.lng ?? 0,
              label: e.text,
              type: e.type,
              municipality: e.municipality_name,
              area: e.area,
              threadId: e.thread_id,
              color: categoryColorHex[e.type],
            }))}
          />
        </Container>
      </Container>
    </Section>
  )
}
