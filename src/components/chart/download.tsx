'use client'

import { useRef } from 'react'
import ReactECharts from 'echarts-for-react'
import { EChartsCoreOption } from 'echarts'

interface ChartProps {
  option: EChartsCoreOption
  downloadable?: boolean
  downloadName?: string
}

export function Chart({
  option,
  downloadable,
  downloadName = 'innsikt',
}: ChartProps) {
  const ref = useRef<ReactECharts>(null)

  function handleDownload() {
    const url = ref.current?.getEchartsInstance().getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#fff',
    })
    if (!url) return

    const a = document.createElement('a')
    a.href = url
    a.download = `${downloadName}.png`
    a.click()
  }

  return (
    <div className="relative">
      {downloadable && (
        <button
          onClick={handleDownload}
          className="absolute top-0 right-0 z-10 text-xs text-gray-400 hover:text-gray-600"
        >
          Last ned
        </button>
      )}
      <ReactECharts ref={ref} option={option} />
    </div>
  )
}
