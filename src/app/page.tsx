import MapClient from '@/components/map'
import Container from '@/components/wrappers/container'
import { fetchDashboardData } from '@/features/dashboard/api/fetch-dashboard-data'
import { fetchThread } from '@/features/dashboard/api/fetch-thread'
import Threads from '@/features/dashboard/components/threads'
import { categoryColorHex } from '@/lib/category-map'
import { error } from 'console'
type Params = {
  searchParams: {
    thread: string
    category: string
  }
}
export default async function Page({ searchParams }: Params) {
  const { thread, category } = await searchParams
  const dashboardData = await fetchDashboardData()
  if (!dashboardData.success) throw error('Kunne ikke laste data')
  const threads = await fetchThread(thread)
  const threadData = threads.success ? threads.data : null
  const filteredEvents = category
    ? dashboardData.data.events.filter((e) => e.type === category)
    : dashboardData.data.events

  return (
    <Container className="h-[92vh] bg-surface">
      <Container className="flex h-full w-full grow relative">
        {/*    <Container className="absolute z-[1000] top-3 left-40 ">
          <DashboardKPI data={dashboardData.data.kpi} />
        </Container> */}
        {/*   <Container className="absolute z-[1000] bottom-3 left-40">
          <Categories data={dashboardData.data.totalCategories} />
        </Container> */}

        <MapClient
          markers={filteredEvents.map((e) => ({
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

        {threadData && (
          <Container
            className={`absolute h-full z-[1000] right-0 bg-surface transition-opacity duration-200 ${thread ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <Threads data={threads.data} />
          </Container>
        )}
      </Container>
    </Container>
  )
}
