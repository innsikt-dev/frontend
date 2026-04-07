import { API_URL } from '@/lib/env'
import { Thread } from './types'
import { Result } from '@/lib/api/types'

export async function fetchThread(
  thread_id: string,
  revalidate = 300
): Promise<Result<Thread[]>> {
  const res = await fetch(`${API_URL}/dashboard/threads/${thread_id}`, {
    next: { revalidate },
  })
  if (!res.ok) return { success: false, data: null }
  const data = await res.json()
  return {
    success: true,
    data,
  }
}
