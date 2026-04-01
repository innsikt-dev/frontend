import { categoryColorHex } from '../category-map'

export const chartTooltip = {
  backgroundColor: '#18162a',
  borderColor: '#2d2a45',
  textStyle: { color: '#e2e0f0' },
  axisPointer: {
    type: 'line',
    lineStyle: { color: '#2d2a45', type: 'dashed' },
  },
}

export const chartAxisBase = {
  axisLine: { show: false },
  axisTick: { show: false },
  splitArea: { show: false },
  splitLine: { show: false },
}

export const chartTextStyle = {
  color: '#9ca3af',
  fontSize: 11,
}

export const chartGrid = {
  top: 10,
  bottom: 30,
  left: 50,
  right: 10,
}

export const chartColors = {
  heatmap: ['#eff6ff', '#93c5fd', '#1d4ed8'],
  comparison: ['#3b82f6', '#f97316'],
  category: categoryColorHex,
  single: '#7c3aed',
}
