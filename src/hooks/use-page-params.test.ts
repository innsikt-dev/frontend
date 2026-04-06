import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePageParams } from '@/hooks/use-page-params'

const mockPush = vi.fn()
const mockGet = vi.fn()
let mockParamString = ''

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({
    toString: () => mockParamString,
    get: mockGet,
  }),
}))

describe('usePageParams', () => {
  beforeEach(() => {
    mockPush.mockClear()
    mockParamString = ''
    mockGet.mockReturnValue(null)
  })

  it('returns period from params', () => {
    mockGet.mockImplementation((key: string) =>
      key === 'period' ? '7d' : null
    )
    const { result } = renderHook(() => usePageParams())
    expect(result.current.period).toBe('7d')
  })

  it('returns null when param is not set', () => {
    const { result } = renderHook(() => usePageParams())
    expect(result.current.municipality).toBeNull()
  })

  it('calls router.push with updated params on update', () => {
    const { result } = renderHook(() => usePageParams())
    act(() => {
      result.current.update({ period: '30d' })
    })
    expect(mockPush).toHaveBeenCalledWith('?period=30d', { scroll: false })
  })

  it('removes param when value is null', () => {
    mockParamString = 'period=7d'
    mockGet.mockImplementation((key: string) =>
      key === 'period' ? '7d' : null
    )
    const { result } = renderHook(() => usePageParams())
    act(() => {
      result.current.update({ period: null })
    })
    expect(mockPush).toHaveBeenCalledWith('?', { scroll: false })
  })
})
