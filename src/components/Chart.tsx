import * as React from 'react'
import {BarChart} from '@mui/x-charts/BarChart'

const chartSetting = {
  xAxis: [
    {
      label: 'invoices'
    }
  ],
  width: 700,
  height: 400
}
const dataset = [
  {
    invoices: 30,
    month: 'Jan'
  },
  {
    invoices: 45,
    month: 'Feb'
  },
  {
    invoices: 48,
    month: 'Mar'
  },
  {
    invoices: 45,
    month: 'Apr'
  },
  {
    invoices: 98,
    month: 'May'
  },
  {
    invoices: 34,
    month: 'June'
  },
  {
    invoices: 87,
    month: 'July'
  },
  {
    invoices: 56,
    month: 'Aug'
  },
  {
    invoices: 23,
    month: 'Sept'
  },
  {
    invoices: 76,
    month: 'Oct'
  },
  {
    invoices: 120,
    month: 'Nov'
  },
  {
    invoices: 80,
    month: 'Dec'
  }
]

const valueFormatter = (value: number) => `${value} invoices`

export default function HorizontalBars() {
  return (
    <div className="text-primary-100">
      <BarChart
        dataset={dataset}
        yAxis={[{scaleType: 'band', dataKey: 'month'}]}
        series={[{dataKey: 'invoices', valueFormatter, color: '#FF6641'}]}
        layout="horizontal"
        {...chartSetting}
      />
    </div>
  )
}
