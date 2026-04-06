'use client'

import { Button } from '@/components/ui/button'
import { useMapParams } from '@/hooks/use-map-params'
import { X } from 'lucide-react'
export default function ClearCategories() {
  const { category, update } = useMapParams()
  return (
    <>
      {category && (
        <Button
          onClick={() => update({ category: null, thread: null })}
          className="rounded-full  cursor-pointer border-line shadow-md"
          variant="secondary"
        >
          <span className="text-content-muted text-xs">{category}</span>
          <X size={12} />
        </Button>
      )}
    </>
  )
}
