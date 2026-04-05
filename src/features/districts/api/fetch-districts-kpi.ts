import { Result } from '@/lib/api/types'
import { API_URL } from '@/lib/env'
import { DistrictKPI } from './types'

export async function fetchDistrictsKpi(): Promise<Result<DistrictKPI[]>> {
  const res = await fetch(`${API_URL}/districts/kpi`)
  if (!res.ok) return { success: false, data: null }
  const data = await res.json()
  return { success: true, data }
}
