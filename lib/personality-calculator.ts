export interface QuestionAnswer {
  questionId: number
  answer: number // 1-5
}

export interface CategoryResult {
  name: string
  score: number
  fullScore: number
  percentage: number
  questions: number[]
}

export interface PersonalityResult {
  totalScore: number
  totalFullScore: number
  percentage: number
  level: string
  levelDescription: string
  categories: CategoryResult[]
}

const categories = [
  {
    name: "生活习惯类",
    questionRange: [1, 5],
    description: "日常生活习惯中的怕麻烦倾向"
  },
  {
    name: "社交与沟通类",
    questionRange: [6, 10],
    description: "社交互动中的怕麻烦表现"
  },
  {
    name: "工作与学习类",
    questionRange: [11, 15],
    description: "工作和学习场景的怕麻烦程度"
  },
  {
    name: "情绪反应类",
    questionRange: [16, 20],
    description: "情绪层面的怕麻烦反应"
  },
  {
    name: "生活决策类",
    questionRange: [21, 25],
    description: "日常生活决策的怕麻烦倾向"
  },
  {
    name: "自我认知与取舍类",
    questionRange: [26, 30],
    description: "自我认知和生活取舍态度"
  }
]

export function calculatePersonality(answers: QuestionAnswer[]): PersonalityResult {
  let totalScore = 0

  const categoryResults: CategoryResult[] = categories.map(category => {
    const categoryQuestions = Array.from(
      { length: category.questionRange[1] - category.questionRange[0] + 1 },
      (_, i) => category.questionRange[0] + i
    )

    const categoryScore = categoryQuestions.reduce((sum, questionId) => {
      const answer = answers.find(a => a.questionId === questionId)
      return sum + (answer?.answer || 0)
    }, 0)

    const categoryFullScore = categoryQuestions.length * 5
    const categoryPercentage = (categoryScore / categoryFullScore) * 100

    totalScore += categoryScore

    return {
      name: category.name,
      score: categoryScore,
      fullScore: categoryFullScore,
      percentage: Math.round(categoryPercentage),
      questions: categoryQuestions
    }
  })

  const totalFullScore = 30 * 5
  const totalPercentage = (totalScore / totalFullScore) * 100

  let level = ""
  let levelDescription = ""

  if (totalScore <= 60) {
    level = "不太怕麻烦"
    levelDescription = "行动力强，乐于接受挑战"
  } else if (totalScore <= 100) {
    level = "中度怕麻烦"
    levelDescription = "容易拖延或简化选择"
  } else {
    level = "重度怕麻烦"
    levelDescription = "倾向于减少社交与复杂决策"
  }

  return {
    totalScore,
    totalFullScore,
    percentage: Math.round(totalPercentage),
    level,
    levelDescription,
    categories: categoryResults
  }
}