import { useRouter, useSearchParams } from 'next/navigation'

type Patch = {
  period?: string | null
  municipality?: string | null
  municipality1?: string | null
  municipality2?: string | null
}

export function usePageParams() {
  const router = useRouter()
  const params = useSearchParams()
  const period = params.get('period')
  const municipality = params.get('municipality')
  const municipality1 = params.get('municipality1')
  const municipality2 = params.get('municipality2')

  function update(patch: Patch) {
    const current = new URLSearchParams(params.toString())
    for (const [key, value] of Object.entries(patch)) {
      if (value === null) current.delete(key)
      else if (value) current.set(key, value)
    }
    router.push(`?${current}`)
  }

  return { period, municipality, municipality1, municipality2, update }
}
