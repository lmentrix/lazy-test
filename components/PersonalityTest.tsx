'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { questions, calculateResult } from '@/data/questions'
import { TestResult } from '@/types/test'
import { ChevronRight, RotateCcw, Share2 } from 'lucide-react'

const PersonalityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(0))
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<TestResult | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const testResult = calculateResult(answers)
      setResult(testResult)
      setShowResult(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers(new Array(questions.length).fill(0))
    setShowResult(false)
    setResult(null)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResult && result) {
    return <ResultComponent result={result} onRestart={handleRestart} answers={answers} />
  }

  const question = questions[currentQuestion]
  const options = [
    { label: '非常不同意', value: 1 },
    { label: '不太同意', value: 2 },
    { label: '一般', value: 3 },
    { label: '比较同意', value: 4 },
    { label: '非常同意', value: 5 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 fade-in">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              怕麻烦人格测试
            </h1>
            <Badge variant="secondary" className="text-sm">
              {currentQuestion + 1} / {questions.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2 transition-all duration-500" />
        </div>

        <Card className="shadow-lg scale-in">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{question.category}</Badge>
            </div>
            <CardTitle className="text-xl md:text-2xl">
              {question.text}
            </CardTitle>
            <CardDescription>
              请根据你的真实感受选择最符合的选项
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={answers[currentQuestion].toString()}
              onValueChange={(value) => handleAnswer(parseInt(value))}
              className="space-y-3"
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value.toString()} id={option.value.toString()} />
                  <Label
                    htmlFor={option.value.toString()}
                    className="flex-1 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                上一题
              </Button>
              <Button
                onClick={handleNext}
                disabled={answers[currentQuestion] === 0}
                className="min-w-[100px]"
              >
                {currentQuestion === questions.length - 1 ? '查看结果' : '下一题'}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const ResultComponent = ({
  result,
  onRestart,
  answers
}: {
  result: TestResult
  onRestart: () => void
  answers: number[]
}) => {
  const [showDetails, setShowDetails] = useState(false)
  const shareResult = () => {
    const text = `我刚刚完成了"怕麻烦人格测试"！\n我的得分是：${result.score}/150\n我是：${result.description}\n\n你也来测测吧！`
    if (navigator.share) {
      navigator.share({
        title: '怕麻烦人格测试结果',
        text: text
      })
    } else {
      navigator.clipboard.writeText(text)
      alert('结果已复制到剪贴板')
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'high': return 'text-purple-600 bg-purple-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const categoryScores = [
    { category: '生活习惯', score: answers.slice(0, 5).reduce((a, b) => a + b, 0) },
    { category: '社交沟通', score: answers.slice(5, 10).reduce((a, b) => a + b, 0) },
    { category: '工作学习', score: answers.slice(10, 15).reduce((a, b) => a + b, 0) },
    { category: '情绪反应', score: answers.slice(15, 20).reduce((a, b) => a + b, 0) },
    { category: '生活决策', score: answers.slice(20, 25).reduce((a, b) => a + b, 0) },
    { category: '自我认知', score: answers.slice(25, 30).reduce((a, b) => a + b, 0) }
  ].sort((a, b) => b.score - a.score)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="shadow-lg overflow-hidden scale-in">
          <div className={`p-6 text-center ${getLevelColor(result.level)} fade-in`}>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {result.description}
            </h1>
            <p className="text-xl opacity-80">
              你的得分：{result.score} / 150
            </p>
          </div>
          <CardContent className="p-6 space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-3">测试结果分析</h2>
              <p className="text-gray-700 leading-relaxed">
                {result.advice}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">各维度得分</h3>
              {categoryScores.map((cat, index) => (
                <div key={cat.category} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{cat.category}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(cat.score / 25) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-10">{cat.score}/25</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={onRestart} variant="outline" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                重新测试
              </Button>
              <Button onClick={shareResult} className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                分享结果
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">得分区间说明</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">30-60分</span>
                <span className="font-medium">行动派达人</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">61-100分</span>
                <span className="font-medium">平衡型选手</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">101-150分</span>
                <span className="font-medium">省心大师</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PersonalityTest