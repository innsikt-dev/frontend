import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useMapParams } from '@/hooks/use-map-params'

const mockPush = vi.fn()
const mockGet = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({
    toString: () => 'category=Trafikk',
    get: mockGet,
  }),
}))

describe('useMapParams', () => {
  beforeEach(() => {
    mockPush.mockClear()
    mockGet.mockImplementation((key: string) => {
      if (key === 'category') return 'Trafikk'
      return null
    })
  })

  it('returns category from params', () => {
    const { result } = renderHook(() => useMapParams())
    expect(result.current.category).toBe('Trafikk')
  })
})
