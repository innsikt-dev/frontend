'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export function useThreadParams() {
  const router = useRouter()
  const params = useSearchParams()
  const thread = params.get('thread')

  function setThread(thread: string) {
    if (!thread) return
    const current = new URLSearchParams(params.toString())
    current.set('thread', thread)
    router.push(`?${current}`)
  }

  function clearThread() {
    const current = new URLSearchParams(params.toString())
    current.delete('thread')
    router.push(`?${current}`)
  }

  return { thread, clearThread, setThread }
}
