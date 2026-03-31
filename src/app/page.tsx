import MapClient from '@/components/map'
import Container from '@/components/wrappers/container'
import Section from '@/components/wrappers/section'
import { fetchDashboardData } from '@/features/dashboard/api/fetch-dashboard-data'
import Categories from '@/features/dashboard/components/categories'
import Events from '@/features/dashboard/components/events'
import Kpi from '@/features/dashboard/components/kpi'
import Threads from '@/features/dashboard/components/threads'
import { categoryColorHex } from '@/lib/category-map'

export default async function Page() {
  const dashboardData = await fetchDashboardData()
  if (!dashboardData.success) return null

  return (
    <Section className="h-[90vh]">
      {/*         <Events data={dashboardData.data.events} /> */}
      {/*   <Threads /> */}
      <Container className="flex h-full w-full grow relative">
        <Container className="absolute z-[1000] top-3 left-40 bg-surface/50 py-2 px-4 rounded-lg">
          <Kpi data={dashboardData.data.kpi} />
        </Container>
        <Container className="absolute z-[1000] bottom-3 left-40">
          <Categories data={dashboardData.data.totalCategories} />
        </Container>
        {/*    <CategoryFilter /> */}
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
    </Section>
  )
}
