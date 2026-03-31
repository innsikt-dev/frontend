import { Result } from '@/lib/api/types'
import { API_URL } from '@/lib/env'
import { DashboardData } from './types'

export async function fetchDashboardData(): Promise<Result<DashboardData>> {
  const res = await fetch(`${API_URL}/dashboard/`)
  if (!res.ok) return { success: false, data: null }
  const data = await res.json()
  return { success: true, data }
}
