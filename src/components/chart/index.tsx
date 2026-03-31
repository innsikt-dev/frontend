'use client'
import ReactECharts from 'echarts-for-react'

type Props = {
  option: object
  className?: string
  height?: string
}

export default function Chart({ option, className, height = '450px' }: Props) {
  return (
    <ReactECharts
      option={option}
      style={{ height, width: '100%' }}
      className={className}
    />
  )
}
