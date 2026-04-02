import { TopMunicipalities } from '@/features/analytics/api/types'
import { chartAxisBase, chartBar, chartTooltip } from '@/lib/chart-config'
import { EChartsCoreOption } from 'echarts'

export function buildTopMunicipalities(
  data: TopMunicipalities[]
): EChartsCoreOption {
  return {
    tooltip: {
      ...chartTooltip,
      axisPointer: { type: 'shadow' },
    },
    grid: { top: 30, left: '3%', right: '4%', bottom: 30, containLabel: true },
    xAxis: {
      type: 'value',
      axisLabel: { color: '#6b7280' },
      ...chartAxisBase,
    },
    yAxis: {
      type: 'category',
      data: data.map((d) => d.municipality_name).reverse(),
      axisLabel: { color: '#6b7280' },
      ...chartAxisBase,
    },

    series: [
      {
        type: 'bar',
        barMaxWidth: 40,
        barWidth: chartBar.barWidth,

        data: data
          .map((d, i) => ({
            value: d.amount,
            itemStyle: {
              color: `hsl(142, 60%, ${35 + i * 5}%)`,
              borderRadius: chartBar.borderRadius,
            },
          }))
          .reverse(),
      },
    ],
  }
}
