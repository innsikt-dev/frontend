import { Result } from '@/lib/api/types'
import { API_URL } from '@/lib/env'
import { MunicipalityParams, MunicipalityKPIResult } from './types'

export async function fetchComparisonKPI(
  queryParams: MunicipalityParams
): Promise<Result<MunicipalityKPIResult>> {
  const res = await fetch(
    `${API_URL}/explore/municipalities?municipality1=${
      queryParams.id1
    }&municipality2=${queryParams.id2}&period=${queryParams.period}`,
    { cache: 'no-cache' }
  )
  if (!res.ok) return { success: false, data: null }

  const data = await res.json()
  return { success: true, data }
}
