export type Municipalities = {
  municipality_name: string
}

export type Municipality = {
  id: number
  municipality_name: string
  district_name: string
}
export type Incidents = {
  amount: number
}

export type CommonCategory = {
  category: string
}
export type DatasetDays = {
  amount: number
}
export type Kpi = {
  incidents: Incidents[]
  commonCategory: CommonCategory[]
  datasetDays: DatasetDays[]
}
export type MunicipalityData = {
  municipality: Municipality
  kpi: Kpi
}
