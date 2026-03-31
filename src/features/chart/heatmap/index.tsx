'use client'
import { HeatMap } from '@/features/analytics/api/types'
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
export default function HeatmapChart({ data }: { data: HeatMap[] }) {
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
      inRange: { color: ['#13111f', '#5b21b6', '#a855f7'] },
    },
    series: [
      {
        type: 'heatmap',
        data: series,
        itemStyle: {
          borderRadius: 4,
          borderWidth: 2,
          borderColor: '#0f0d1a',
        },
      },
    ],
  } satisfies EChartsCoreOption

  return (
    <ReactECharts option={option} style={{ height: '350px', width: '100%' }} />
  )
}
