import { Result } from '@/lib/api/types'
import { API_URL } from '@/lib/env'
import { Municipalities } from './types'

export async function fetchNames(): Promise<Result<Municipalities[]>> {
  const res = await fetch(`${API_URL}/municipality/municipalities`, {
    cache: 'no-cache',
  })

  if (!res.ok) return { success: false, data: null }

  const data = await res.json()
  return { success: true, data }
}
