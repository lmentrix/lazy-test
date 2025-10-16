"use client"

import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface LevelProgressChartProps {
  score: number
  totalScore: number
}

export function LevelProgressChart({ score, totalScore }: LevelProgressChartProps) {
  const percentage = (score / totalScore) * 100

  let level = ""
  let levelDescription = ""
  let levelColor = ""
  let progress = 0

  if (score <= 60) {
    level = "不太怕麻烦"
    levelDescription = "行动力强，乐于接受挑战"
    levelColor = "bg-green-500"
    progress = (score / 60) * 33.33
  } else if (score <= 100) {
    level = "中度怕麻烦"
    levelDescription = "容易拖延或简化选择"
    levelColor = "bg-yellow-500"
    progress = 33.33 + ((score - 60) / 40) * 33.33
  } else {
    level = "重度怕麻烦"
    levelDescription = "倾向于减少社交与复杂决策"
    levelColor = "bg-red-500"
    progress = 66.66 + ((score - 100) / 50) * 33.34
  }

  const levels = [
    { name: "不太怕麻烦", range: "30-60分", description: "行动力强", achieved: score >= 30 },
    { name: "中度怕麻烦", range: "61-100分", description: "容易拖延", achieved: score >= 61 },
    { name: "重度怕麻烦", range: "101-150分", description: "倾向简化", achieved: score >= 101 }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>怕麻烦人格等级</span>
          <Badge variant="outline" className={`${levelColor.replace('bg-', 'text-')} border-current`}>
            {level}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>总体进度</span>
            <span>{percentage.toFixed(1)}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">等级达成情况</h4>
          <div className="space-y-3">
            {levels.map((lvl, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${lvl.achieved ? 'bg-primary' : 'bg-muted'}`} />
                  <div>
                    <p className="font-medium text-sm">{lvl.name}</p>
                    <p className="text-xs text-muted-foreground">{lvl.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{lvl.range}</p>
                  <Badge variant={lvl.achieved ? "default" : "secondary"} className="text-xs">
                    {lvl.achieved ? "已达成" : "未达成"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">当前状态</p>
          <p className="text-sm text-muted-foreground">{levelDescription}</p>
          <p className="text-xs text-muted-foreground mt-1">
            得分: {score}/{totalScore}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}