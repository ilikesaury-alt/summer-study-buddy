// 全局类型定义

export type Subject = "chinese" | "math" | "english";

export type QuestionType = "choice" | "fill";

// 闯关题目
export interface Question {
  id: string;
  subject: Subject;
  type: QuestionType;
  stem: string; // 题干
  options?: string[]; // 选择题选项
  answer: string; // 正确答案(选择题填选项值,填空题填答案文本)
  explanation: string; // 解析
}

// 作业打卡项
export interface HomeworkItem {
  id: string;
  subject: Subject | "other";
  title: string;
  detail?: string;
}

// 每日记录
export interface DailyRecord {
  date: string; // YYYY-MM-DD
  homework: HomeworkItem[];
  checkedIds: string[]; // 已完成项 id
  allCompleted: boolean;
}

// 答题记录
export interface QuizRecord {
  id: string;
  subject: Subject;
  date: string;
  score: number; // 正确数
  total: number;
  durationSec: number;
  earnedStars: number;
}

// 错题
export interface WrongQuestion {
  id: string;
  subject: Subject;
  stem: string;
  options?: string[];
  answer: string;
  explanation: string;
  wrongCount: number;
  lastWrongDate: string;
}

// 勋章
export interface Badge {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  unlocked: boolean;
  unlockedDate: string | null;
}

// 预习模块
export type PreviewModule =
  | "chinese-recite"
  | "dictation"
  | "math"
  | "english";

export interface ReciteItem {
  id: string;
  title: string;
  author?: string;
  content: string; // 诗文内容
  tip?: string; // 背诵小贴士
}

export interface DictationItem {
  id: string;
  word: string; // 词语
  hint?: string; // 提示/造句
}

export interface MathPreviewItem {
  id: string;
  title: string;
  concept: string; // 概念讲解
  example: string; // 例题
  steps: string[]; // 解题步骤
  practice: { question: string; answer: string }; // 小试身手
}

export interface EnglishWord {
  id: string;
  word: string;
  meaning: string;
  emoji: string;
  sentence: string;
}
