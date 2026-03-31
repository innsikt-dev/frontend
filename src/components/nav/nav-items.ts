import { Radio, ChartNoAxesColumn, Search, GitCompare } from 'lucide-react'
export const navItems = [
  {
    id: 1,
    icon: Radio,

    label: 'Forsiden',
    path: '/',
  },
  { id: 2, icon: ChartNoAxesColumn, label: 'Analyse', path: '/analyse' },
  { id: 3, icon: Search, label: 'Kommunesøk', path: '/kommunesok' },
  { id: 4, icon: GitCompare, label: 'Sammenlign', path: '' },
]
