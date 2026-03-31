'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export function useThreadParams() {
  const router = useRouter()
  const params = useSearchParams()
  const thread = params.get('thread')

  function setThread(thread: string) {
    const param = new URLSearchParams(params.toString())
    param.set('thread', thread)
  }

  return { thread, setThread }
}
