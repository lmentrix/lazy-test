"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface BarChartProps {
  data: Array<{
    category: string
    score: number
    fullScore: number
    percentage: number
  }>
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--chart-1))',
]

export function CategoryBarChart({ data }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="category"
          angle={-45}
          textAnchor="end"
          height={100}
          tick={{ fontSize: 12 }}
          className="fill-muted-foreground"
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fontSize: 12 }}
          className="fill-muted-foreground"
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload[0]) {
              const data = payload[0].payload
              return (
                <div className="bg-background border rounded-md p-2 shadow-lg">
                  <p className="font-medium">{data.category}</p>
                  <p className="text-sm text-muted-foreground">
                    得分: {data.score}/{data.fullScore}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    百分比: {data.percentage}%
                  </p>
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}