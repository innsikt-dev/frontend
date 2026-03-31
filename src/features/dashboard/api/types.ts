export type DashboardEvent = {
  id: number
  municipality_name: string
  lat: number
  lng: number
  thread_id: string
  area: string
  text: string
  type: string
  created_on: string
  updated_on: string
  is_active: boolean
}
export type DashboardKpi = {
  totalIncidents: number
  mostActiveDistrict: string | null
  mostCommonCategory: string | null
  activeIncidents: number
}

export type DashboardData = {
  kpi: DashboardKpi
  events: DashboardEvent[]
}
