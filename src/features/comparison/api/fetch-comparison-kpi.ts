import { Result } from '@/lib/api/types'
import { API_URL } from '@/lib/env'
import { ComparisonKPIResult, ComparisonParams } from './types'

export async function fetchComparisonKPI(
  queryParams: ComparisonParams
): Promise<Result<ComparisonKPIResult>> {
  const res = await fetch(
    `${API_URL}/comparison/municipalities?municipality1=${
      queryParams.id1
    }&municipality2=${queryParams.id2}&period=${queryParams.period}`,
    { cache: 'no-cache' }
  )
  if (!res.ok) return { success: false, data: null }

  const data = await res.json()
  return { success: true, data }
}
