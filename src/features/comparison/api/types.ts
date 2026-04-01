export type ComparisonIncidentsOverTime = {
  municipality_name: string
  date: string
  amount: number
}

export type ComparisonKeywordIncidents = {
  municipality_name: string
  category: string
  amount: number
}
export type MunicipalityComparison = {
  incidentsOverTime: ComparisonIncidentsOverTime[]
  keywordIncidents: ComparisonKeywordIncidents[]
}

export type MunicipalitiesComparisonName = {
  municipality_name: string
}

export type MunicipalitiesComparisonKPI = {
  municipality_name: string
  district_name: string
  total_incidents: number
  avg_per_day: number
  most_common_category: string
}

export type QueryParams = {
  id1: string
  id2: string
  period: string
}
