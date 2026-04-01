import { Result } from '@/lib/api/types'
import { API_URL } from '@/lib/env'
import { ComparisonName } from '@/features/comparison/api/types'

export async function fetchNames(): Promise<Result<ComparisonName[]>> {
  const res = await fetch(`${API_URL}/municipality/municipalities`, {
    cache: 'no-cache',
  })

  if (!res.ok) return { success: false, data: null }

  const data = await res.json()
  return { success: true, data }
}
