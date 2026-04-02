import { Result } from '@/lib/api/types'
import { API_URL } from '@/lib/env'
import { MunicipalityName } from '@/features/explore/api/types'

export async function fetchMunicipalitiesNames(): Promise<
  Result<MunicipalityName[]>
> {
  const res = await fetch(`${API_URL}/municipality/municipalities`, {
    cache: 'no-cache',
  })

  if (!res.ok) return { success: false, data: null }

  const data = await res.json()
  return { success: true, data }
}
