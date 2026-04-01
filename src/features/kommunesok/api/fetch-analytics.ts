import { Result } from '@/lib/api/types'
import { API_URL } from '@/lib/env'
import { MunicipalityAnalytics } from './types'

export async function fetchAnalytics(
  municipality_name: string,
  period: string
): Promise<Result<MunicipalityAnalytics>> {
  const res = await fetch(
    `${API_URL}/municipality/analytics/${municipality_name}?period=${period}`,
    {
      cache: 'no-cache',
    }
  )

  if (!res.ok) return { success: false, data: null }

  const data = await res.json()
  return { success: true, data }
}
