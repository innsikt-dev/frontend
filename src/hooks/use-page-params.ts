import { useRouter, useSearchParams } from 'next/navigation'

type Patch = {
  period?: string | null
  municipality?: string | null
}

export function usePageParams() {
  const router = useRouter()
  const params = useSearchParams()
  const period = params.get('period')
  const municipality = params.get('municipality')

  function update(patch: Patch) {
    const current = new URLSearchParams(params.toString())
    for (const [key, value] of Object.entries(patch)) {
      if (value === null) current.delete(key)
      else if (value) current.set(key, value)
    }
    router.push(`?${current}`)
  }

  return { period, municipality, update }
}
