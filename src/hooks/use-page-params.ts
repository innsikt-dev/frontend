import { useRouter, useSearchParams } from 'next/navigation'

type PageParams = {
  period?: string | null
  update: (patch: { period?: string | null }) => void
}
export function usePageParams(): PageParams {
  const router = useRouter()
  const params = useSearchParams()
  const period = params.get('period')
  function update(patch: { period?: string | null }) {
    const current = new URLSearchParams(params.toString())
    for (const [key, value] of Object.entries(patch)) {
      console.log(`${key}:${value}`)
      if (value === null) {
        current.delete(key)
      } else if (value) current.set(key, value)

      router.push(`?${current}`)
    }
  }

  return { period, update }
}
