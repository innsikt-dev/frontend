import { useRouter, useSearchParams } from 'next/navigation'

export function useMapParams() {
  const router = useRouter()
  const params = useSearchParams()
  const current = new URLSearchParams(params.toString())
  const thread = params.get('thread')
  const category = params.get('category')

  function update(patch: { thread?: string | null; category?: string | null }) {
    for (const [key, value] of Object.entries(patch)) {
      if (value === null) current.delete(key)
      else if (value) current.set(key, value)
    }
    router.push(`?${current}`)
  }
  function clearThread() {
    current.delete('thread')
    router.push(`?${current}`)
  }
  return { thread, clearThread, category, update }
}
