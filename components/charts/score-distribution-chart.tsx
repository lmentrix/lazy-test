"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface DistributionChartProps {
  score: number
  totalScore: number
}

export function ScoreDistributionChart({ score, totalScore }: DistributionChartProps) {
  
  
  const data = [
    { name: '当前得分', value: score, color: 'hsl(var(--primary))' },
    { name: '剩余分数', value: totalScore - score, color: 'hsl(var(--muted))' }
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
            outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload[0]) {
              const data = payload[0].payload
              return (
                <div className="bg-background border rounded-md p-2 shadow-lg">
                  <p className="font-medium">{data.name}</p>
                  <p className="text-sm text-muted-foreground">
                    分数: {data.value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    占比: {((data.value / totalScore) * 100).toFixed(1)}%
                  </p>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}