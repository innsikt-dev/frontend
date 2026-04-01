export type ComparisonIncidentsOverTime = {
  municipality_name: string
  date: string
  amount: number
}

export type ComparisonCategoryDistribution = {
  municipality_name: string
  category: string
  amount: number
}

export type ComparisonAnalytics = {
  incidentsOverTime: ComparisonIncidentsOverTime[]
  categoryDistribution: ComparisonCategoryDistribution[]
}

export type ComparisonName = {
  municipality_name: string
}

export type ComparisonKPI = {
  municipality_name: string
  district_name: string
  total_incidents: number
  avg_per_day: number
  most_common_category: string
}
export type ComparisonKPIResult = {
  municipalityOne: ComparisonKPI
  municipalityTwo: ComparisonKPI
}

export type ComparisonParams = {
  id1: string
  id2: string
  period: string
}
