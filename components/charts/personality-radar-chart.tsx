"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

interface RadarChartProps {
  data: Array<{
    category: string
    score: number
    fullScore: number
  }>
}

export function PersonalityRadarChart({ data }: RadarChartProps) {
  const radarData = data.map(item => ({
    category: item.category,
    score: (item.score / item.fullScore) * 100,
    fullMark: 100
  }))

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={radarData}>
        <PolarGrid strokeDasharray="3 3" className="stroke-muted" />
        <PolarAngleAxis
          dataKey="category"
          className="text-xs fill-muted-foreground"
          tick={{ fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fontSize: 10 }}
          className="fill-muted-foreground"
        />
        <Radar
          name="怕麻烦指数"
          dataKey="score"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.6}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}