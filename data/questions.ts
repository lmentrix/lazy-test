import { Question } from '@/types/test'

export const questions: Question[] = [
  // 生活习惯类
  { id: 1, category: '生活习惯', text: '我宁愿自己将就，也不想麻烦别人帮忙。' },
  { id: 2, category: '生活习惯', text: '看到复杂的说明书或使用说明时，我会立刻打退堂鼓。' },
  { id: 3, category: '生活习惯', text: '只要想到要整理房间或收拾东西，我就有点头大。' },
  { id: 4, category: '生活习惯', text: '如果有能自动解决的选项（例如自动付款、自动续费），我会毫不犹豫地选择。' },
  { id: 5, category: '生活习惯', text: '出门前准备太多步骤会让我觉得"算了不去了"。' },

  // 社交与沟通类
  { id: 6, category: '社交沟通', text: '我觉得解释事情太麻烦，宁愿自己憋着不说。' },
  { id: 7, category: '社交沟通', text: '当别人邀请我参加聚会时，我通常会想"要是能推掉就好了"。' },
  { id: 8, category: '社交沟通', text: '如果要和陌生人打电话或发消息，我会拖延很久。' },
  { id: 9, category: '社交沟通', text: '当别人请求帮助，我会犹豫很久是否答应。' },
  { id: 10, category: '社交沟通', text: '我常觉得"哎，麻烦啊，不如我自己轻松点"。' },

  // 工作与学习类
  { id: 11, category: '工作学习', text: '我要做的任务如果步骤太繁琐，我就容易拖延。' },
  { id: 12, category: '工作学习', text: '我偏好"一次解决"的方式，不喜欢分阶段处理事情。' },
  { id: 13, category: '工作学习', text: '在做决定前，我不愿意查太多资料或比较太多选项。' },
  { id: 14, category: '工作学习', text: '有需要反复修改的工作，我会觉得极其烦躁。' },
  { id: 15, category: '工作学习', text: '我更愿意用"差不多就行"来结束任务。' },

  // 情绪反应类
  { id: 16, category: '情绪反应', text: '看到有人求助时，第一个反应是"好麻烦"。' },
  { id: 17, category: '情绪反应', text: '如果事情出错，我会懊恼自己为什么没能一次做好。' },
  { id: 18, category: '情绪反应', text: '有人给我提意见时，我会想"要改也太麻烦了"。' },
  { id: 19, category: '情绪反应', text: '我经常因为觉得"麻烦"而错过一些机会。' },
  { id: 20, category: '情绪反应', text: '我觉得自己精力不多，想省去一切不必要的步骤。' },

  // 生活决策类
  { id: 21, category: '生活决策', text: '我买东西会直接选熟悉品牌，不想再了解新选项。' },
  { id: 22, category: '生活决策', text: '我会因为"要注册账号太麻烦"而放弃使用某个软件或网站。' },
  { id: 23, category: '生活决策', text: '出行时，我宁可打车也不想折腾公交或换乘。' },
  { id: 24, category: '生活决策', text: '我喜欢别人替我规划好行程或选择。' },
  { id: 25, category: '生活决策', text: '我会避开需要长期投入的活动，因为觉得麻烦。' },

  // 自我认知与取舍类
  { id: 26, category: '自我认知', text: '我知道自己其实是个怕麻烦的人。' },
  { id: 27, category: '自我认知', text: '我羡慕那些能认真计划与执行的人。' },
  { id: 28, category: '自我认知', text: '我认为"怕麻烦"有时其实是保护自己的方式。' },
  { id: 29, category: '自我认知', text: '如果生活能自动化，我会觉得人生更轻松。' },
  { id: 30, category: '自我认知', text: '我愿意为减少麻烦而牺牲一些品质或体验。' }
]

export const calculateResult = (answers: number[]) => {
  const score = answers.reduce((sum, answer) => sum + answer, 0)

  let level: 'low' | 'medium' | 'high'
  let description: string
  let advice: string

  if (score <= 60) {
    level = 'low'
    description = '行动派达人 🚀'
    advice = '你不太怕麻烦，行动力强！这种特质让你能够抓住很多机会，体验丰富的人生。建议保持这种积极态度，同时也要学会合理安排精力，避免过度劳累。'
  } else if (score <= 100) {
    level = 'medium'
    description = '平衡型选手 ⚖️'
    advice = '你中度怕麻烦，容易在行动和省事之间找平衡。这其实是一种智慧，但有时可能因此错过一些机会。建议尝试突破舒适区，从小事开始培养行动力。'
  } else {
    level = 'high'
    description = '省心大师 😌'
    advice = '你倾向于减少麻烦，追求简单生活。这种生活方式让你保持内心平静，但可能限制了一些可能性。建议偶尔挑战自己，发现"麻烦"背后的精彩。'
  }

  return { score, level, description, advice }
}