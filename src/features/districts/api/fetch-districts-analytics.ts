import { Result } from '@/lib/api/types'
import { API_URL } from '@/lib/env'
import { DistrictAnalytics } from './types'

export async function fetchDistrictsAnalytics(): Promise<
  Result<DistrictAnalytics>
> {
  const res = await fetch(`${API_URL}/districts/analytics`)
  if (!res.ok) return { success: false, data: null }
  const data = await res.json()
  return { success: true, data }
}
