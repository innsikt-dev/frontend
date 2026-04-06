'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SseListener() {
  const router = useRouter()

  useEffect(() => {
    const source = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/sse`)

    source.addEventListener('new-incidents', () => {
      router.refresh()
    })

    return () => source.close()
  }, [])

  return null
}
