import { CategoryDistribution } from '@/features/analytics/api/types'
import { categoryColorHex } from '@/lib/category-map'

export function buildCategoryDistribution(data: CategoryDistribution[]) {
  return {
    tooltip: { trigger: 'axis' },
    grid: { top: 20, left: '3%', right: '4%', bottom: 30, containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.category),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#6b7280' },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#6b7280' },
      splitLine: { lineStyle: { color: '#1e1c2e' } },
    },
    series: [
      {
        name: 'Hendelser',
        type: 'bar',
        barMaxWidth: 40,
        data: data.map((d) => ({
          value: d.amount,
          itemStyle: {
            color: categoryColorHex[d.category],
            borderRadius: [4, 4, 0, 0],
          },
        })),
      },
    ],
  }
}
