'use client'
import { AnalyticsHeatMap } from '@/features/analytics/api/types'
import { chartAxisBase, chartTextStyle, chartTooltip } from '@/lib/chart-config'
import { EChartsCoreOption } from 'echarts'
import ReactECharts from 'echarts-for-react'

const dowToYIndex: Record<number, number> = {
  1: 6, // man
  2: 5, // tir
  3: 4, // ons
  4: 3, // tor
  5: 2, // fre
  6: 1, // lør
  0: 0, // søn
}
export default function HeatmapChart({ data }: { data: AnalyticsHeatMap[] }) {
  const existing = new Set(data.map((d) => `${d.time}-${d.day}`))

  const series = [...data.map((d) => [d.time, dowToYIndex[d.day], d.amount])]

  for (let hour = 0; hour < 24; hour++) {
    for (const [day, yIndex] of Object.entries(dowToYIndex)) {
      if (!existing.has(`${hour}-${day}`)) {
        series.push([hour, yIndex, 0])
      }
    }
  }
  const option = {
    grid: { top: 10, bottom: 30, left: 50, right: 10 },
    tooltip: chartTooltip,
    xAxis: {
      type: 'category',
      data: Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')),
      ...chartAxisBase,
    },

    yAxis: {
      type: 'category',
      data: ['Søn', 'Lør', 'Fre', 'Tor', 'Ons', 'Tir', 'Man'],
      ...chartAxisBase,
      ...chartTextStyle,
    },
    visualMap: {
      min: 0,
      max: 18,
      show: false,
      inRange: { color: ['#eff6ff', '#93c5fd', '#1d4ed8'] },
    },
    series: [
      {
        type: 'heatmap',
        data: series,
        itemStyle: {
          borderRadius: 4,
          borderWidth: 3,
          borderColor: '#ffffff',
        },
      },
    ],
  } satisfies EChartsCoreOption

  return (
    <ReactECharts
      option={option}
      style={{ height: '300px', width: '100%' }}
      notMerge={false}
      lazyUpdate={true}
    />
  )
}
