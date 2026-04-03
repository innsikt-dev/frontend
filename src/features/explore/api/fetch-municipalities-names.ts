import { Result } from '@/lib/api/types'
import { API_URL } from '@/lib/env'

export async function fetchMunicipalitiesNames(): Promise<Result<string[]>> {
  const res = await fetch(`${API_URL}/explore/municipalities/names`, {
    cache: 'no-cache',
  })

  if (!res.ok) return { success: false, data: null }

  const data = await res.json()

  return { success: true, data }
}
