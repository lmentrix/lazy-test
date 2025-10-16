"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { PersonalityRadarChart } from '@/components/charts/personality-radar-chart'
import { CategoryBarChart } from '@/components/charts/category-bar-chart'
import { ScoreDistributionChart } from '@/components/charts/score-distribution-chart'
import { LevelProgressChart } from '@/components/charts/level-progress-chart'
import { PersonalityResult, QuestionAnswer, calculatePersonality } from '@/lib/personality-calculator'
import { Brain, TrendingUp, Target, BarChart3 } from 'lucide-react'

export default function ResultsPage() {
  const [result, setResult] = useState<PersonalityResult | null>(null)

  useEffect(() => {
    const savedAnswers = localStorage.getItem('personalityTestAnswers')
    if (savedAnswers) {
      const answers: QuestionAnswer[] = JSON.parse(savedAnswers)
      const calculatedResult = calculatePersonality(answers)
      setResult(calculatedResult)
    } else {
      const mockData: QuestionAnswer[] = Array.from({ length: 30 }, (_, i) => ({
        questionId: i + 1,
        answer: Math.floor(Math.random() * 5) + 1
      }))
      const mockResult = calculatePersonality(mockData)
      setResult(mockResult)
    }
  }, [])

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">正在分析结果...</p>
        </div>
      </div>
    )
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "不太怕麻烦":
        return "bg-green-500"
      case "中度怕麻烦":
        return "bg-yellow-500"
      case "重度怕麻烦":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getInsights = (result: PersonalityResult) => {
    const highestCategory = result.categories.reduce((max, cat) =>
      cat.percentage > max.percentage ? cat : max
    )
    const lowestCategory = result.categories.reduce((min, cat) =>
      cat.percentage < min.percentage ? cat : min
    )

    return {
      highest: highestCategory,
      lowest: lowestCategory,
      advice: result.level === "不太怕麻烦"
        ? "您的行动力很强，建议继续保持积极的生活态度，同时也要注意适当休息。"
        : result.level === "中度怕麻烦"
        ? "您在某些方面可能容易拖延，建议尝试将复杂任务分解为小步骤。"
        : "您可能倾向于简化生活，建议逐步接受一些挑战，丰富生活体验。"
    }
  }

  const insights = getInsights(result)

  return (
    <>
      <header className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <Brain className="h-8 w-8 text-primary" />
              怕麻烦人格测试结果
            </h1>
            <p className="text-muted-foreground">基于30个问题的综合分析</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  总体得分
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {result.totalScore}
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  总分: {result.totalFullScore}
                </div>
                <Badge
                  variant="outline"
                  className={`${getLevelColor(result.level).replace('bg-', 'text-')} border-current mb-4`}
                >
                  {result.level}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {result.levelDescription}
                </p>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  得分分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScoreDistributionChart
                  score={result.totalScore}
                  totalScore={result.totalFullScore}
                />
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <LevelProgressChart
                score={result.totalScore}
                totalScore={result.totalFullScore}
              />
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">总览分析</TabsTrigger>
              <TabsTrigger value="categories">分类详情</TabsTrigger>
              <TabsTrigger value="insights">深度洞察</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>人格维度雷达图</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PersonalityRadarChart data={result.categories} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>分类得分对比</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CategoryBarChart data={result.categories} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.categories.map((category, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">得分</span>
                          <span className="font-medium">
                            {category.score}/{category.fullScore}
                          </span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">百分比</span>
                          <Badge variant="secondary">{category.percentage}%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      数据洞察
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">最突出的特征</h4>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">{insights.highest.name}</p>
                        <p className="text-sm text-muted-foreground">
                          得分率: {insights.highest.percentage}%
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">相对优势领域</h4>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">{insights.lowest.name}</p>
                        <p className="text-sm text-muted-foreground">
                          得分率: {insights.lowest.percentage}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>个性化建议</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm leading-relaxed">
                        {insights.advice}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>详细分析报告</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">各维度分析</h4>
                    <div className="space-y-3">
                      {result.categories.map((category, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium">{category.name}</h5>
                            <Badge variant="outline">{category.percentage}%</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            该维度反映了您在{category.name.replace('类', '')}方面的怕麻烦倾向。
                            {category.percentage >= 80
                              ? " 您在这个方面表现出较强的怕麻烦特征，建议适当调整。"
                              : category.percentage >= 60
                              ? " 您在这个方面处于中等水平，可以根据需要适当平衡。"
                              : " 您在这个方面表现较好，保持现状即可。"
                            }
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
    </>
  )
}