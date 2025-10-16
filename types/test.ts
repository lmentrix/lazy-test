export interface Question {
  id: number
  category: string
  text: string
}

export type Answer = {
  questionId: number
  value: number
}

export type ResultLevel = 'low' | 'medium' | 'high'

export interface TestResult {
  score: number
  level: ResultLevel
  description: string
  advice: string
}