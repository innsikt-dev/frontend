import { Result } from '@/lib/api/types'
import { API_URL } from '@/lib/env'

export type ComparisonIncidentsOverTime = {
  municipality_name: string
  date: string
  amount: number
}

export type ComparisonKeywordIncidents = {
  municipality_name: string
  category: string
  amount: number
}
export type MunicipalityComparison = {
  incidentsOverTime: ComparisonIncidentsOverTime[]
  keywordIncidents: ComparisonKeywordIncidents[]
}
type Payload = {
  id1: string
  id2: string
  period: string
}
export async function fetchAnalytics(
  payload: Payload
): Promise<Result<MunicipalityComparison>> {
  const res = await fetch(
    `${API_URL}/explore/municipalities/analytics?municipality1=${
      payload.id1
    }&municipality2=${payload.id2}&period=${payload.period}`,
    { cache: 'no-cache' }
  )
  if (!res.ok) return { success: false, data: null }
  const data = await res.json()
  return { success: true, data }
}
