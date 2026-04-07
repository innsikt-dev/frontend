import { Result } from '@/lib/api/types'
import { API_URL } from '@/lib/env'
import { DistrictAnalytics } from './types'

type DistrictParams = {
  district: string
  period: string
}
export async function fetchDistrictsAnalytics(
  params: DistrictParams,
  revalidate = 3600
): Promise<Result<DistrictAnalytics>> {
  const res = await fetch(
    `${API_URL}/districts/analytics?period=${params.period}${params.district ? `&district=${params.district}` : ''}`,
    {
      next: { revalidate },
    }
  )
  if (!res.ok) return { success: false, data: null }
  const data = await res.json()
  return { success: true, data }
}
