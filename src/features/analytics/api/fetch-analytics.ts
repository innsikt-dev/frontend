import { Result } from '@/lib/api/types'
import { API_URL } from '@/lib/env'
import { Analytics } from './types'

export async function fetchAnalytics(
  period: string,
  revalidate = 3600
): Promise<Result<Analytics>> {
  const res = await fetch(`${API_URL}/analytics?period=${period}`, {
    next: { revalidate },
  })
  if (!res.ok) return { success: false, data: null }
  const data = await res.json()
  return { success: true, data }
}
