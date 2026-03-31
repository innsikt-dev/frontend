import { API_URL } from '@/lib/env'
import { MunicipalityData } from './types'
import { Result } from '@/lib/api/types'

export async function fetchMunicipalityData(
  id: string
): Promise<Result<MunicipalityData>> {
  const res = await fetch(`${API_URL}/municipality/${id}`, {
    cache: 'no-cache',
  })

  if (!res.ok) return { success: false, data: null }

  const data = await res.json()
  return { success: true, data }
}
