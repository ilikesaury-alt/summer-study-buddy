// 出题引擎
import type { Question, Subject } from "@/types";
import { getQuestionsBySubject } from "@/data/reviewQuestions";

// 洗牌
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 从某学科题库随机抽取 n 题(不足则全返)
export function generateQuiz(subject: Subject, count = 10): Question[] {
  const pool = getQuestionsBySubject(subject);
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}

// 判断答案是否正确(去除前后空格,不区分大小写)
export function isCorrect(question: Question, userAnswer: string): boolean {
  const a = userAnswer.trim().toLowerCase();
  const b = question.answer.trim().toLowerCase();
  return a === b;
}

// 根据正确数计算星星
export function calcStars(correct: number, total: number): number {
  const ratio = total > 0 ? correct / total : 0;
  if (ratio === 1) return 10; // 满分 10 颗星
  if (ratio >= 0.8) return 7;
  if (ratio >= 0.6) return 5;
  if (ratio >= 0.4) return 3;
  return 1; // 参与奖
}
