import { CategoryDistribution } from '@/features/analytics/api/types'
import { chartAxisBase, chartBar, chartColors } from '@/lib/chart-config'

export function buildCategoryDistribution(data: CategoryDistribution[]) {
  return {
    tooltip: { trigger: 'axis' },
    grid: { top: 20, left: '3%', right: '4%', bottom: 30, containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.category),

      axisLabel: { color: '#6b7280' },
      ...chartAxisBase,
    },
    yAxis: {
      type: 'value',

      axisLabel: { color: '#6b7280' },

      ...chartAxisBase,
    },
    series: [
      {
        name: 'Hendelser',
        type: 'bar',
        barMaxWidth: 40,
        barWidth: chartBar.barWidth,
        data: data.map((d) => ({
          value: d.amount,
          itemStyle: {
            color: chartColors.category[d.category],
            borderRadius: chartBar.borderRadius,
          },
        })),
      },
    ],
  }
}
