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
    day: 'Mon'
  },
  {
    invoices: 45,
    day: 'Tue'
  },
  {
    invoices: 48,
    day: 'Wed'
  },
  {
    invoices: 45,
    day: 'Thu'
  },
  {
    invoices: 98,
    day: 'Fri'
  },
  {
    invoices: 34,
    day: 'Sat'
  },
  {
    invoices: 87,
    day: 'Sun'
  }
]

const valueFormatter = (value: number) => `${value} invoices`

export default function HorizontalBars() {
  return (
    <div className="text-primary-100">
      <BarChart
        dataset={dataset}
        yAxis={[{scaleType: 'band', dataKey: 'day'}]}
        series={[{dataKey: 'invoices', valueFormatter, color: '#FF6641'}]}
        layout="horizontal"
        {...chartSetting}
      />
    </div>
  )
}
