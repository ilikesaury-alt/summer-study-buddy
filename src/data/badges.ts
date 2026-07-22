import type { Badge } from "@/types";

// 勋章定义
export const BADGES: Omit<Badge, "unlocked" | "unlockedDate">[] = [
  {
    id: "first-checkin",
    name: "初次打卡",
    emoji: "🌱",
    desc: "完成第一次作业打卡",
  },
  {
    id: "streak-7",
    name: "坚持一周",
    emoji: "🔥",
    desc: "连续打卡 7 天",
  },
  {
    id: "streak-21",
    name: "习惯养成",
    emoji: "🌟",
    desc: "连续打卡 21 天",
  },
  {
    id: "streak-30",
    name: "暑假达人",
    emoji: "🏆",
    desc: "连续打卡 30 天",
  },
  {
    id: "quiz-100",
    name: "答题百题",
    emoji: "✏️",
    desc: "累计答题 100 道",
  },
  {
    id: "perfect-score",
    name: "满分闯关",
    emoji: "💯",
    desc: "一次闯关全部答对",
  },
  {
    id: "wrong-clear",
    name: "错题清零",
    emoji: "🧹",
    desc: "错题本全部清除",
  },
  {
    id: "preview-half",
    name: "预习过半",
    emoji: "📖",
    desc: "完成一半预习内容",
  },
  {
    id: "preview-all",
    name: "预习达人",
    emoji: "🎓",
    desc: "完成全部预习内容",
  },
  {
    id: "star-100",
    name: "星星收集者",
    emoji: "⭐",
    desc: "累计获得 100 颗星星",
  },
  {
    id: "star-500",
    name: "闪耀之星",
    emoji: "✨",
    desc: "累计获得 500 颗星星",
  },
];

// 学科展示信息
export const SUBJECT_INFO = {
  chinese: { name: "语文", emoji: "📚", color: "coral", grad: "from-coral-300 to-coral-400" },
  math: { name: "数学", emoji: "🔢", color: "sky2", grad: "from-sky2-300 to-sky2-400" },
  english: { name: "英语", emoji: "🔤", color: "mint", grad: "from-mint-300 to-mint-400" },
  other: { name: "其他", emoji: "🎒", color: "coffee", grad: "from-coffee to-sun-300" },
} as const;

// 学科配色类名(避免 Tailwind 动态拼接失效)
export const SUBJECT_CLASSES = {
  chinese: { tag: "bg-coral-100 text-coral-500", dot: "bg-coral-300", soft: "bg-coral-50" },
  math: { tag: "bg-sky2-100 text-sky2-500", dot: "bg-sky2-300", soft: "bg-sky2-50" },
  english: { tag: "bg-mint-100 text-mint-500", dot: "bg-mint-300", soft: "bg-mint-50" },
  other: { tag: "bg-coffee/40 text-ink", dot: "bg-coffee", soft: "bg-coffee/20" },
} as const;

// 每日寄语
export const DAILY_TIPS = [
  "今天的努力,是明天的礼物!加油呀~",
  "每一道题都是一次小冒险,勇敢去挑战吧!",
  "学习像种小树,每天浇一点水,就会长大啦!",
  "你比自己想象的更聪明,相信自己!",
  "遇到难题别怕,慢慢想,你一定能行!",
  "完成一项作业,就离梦想更近一步!",
  "今天背下的字,以后会变成你的好朋友!",
  "小手一勾,作业变少,快乐变多!",
  "坚持就是超能力,你已经拥有它啦!",
  "认真的你,是最酷的三年级准新生!",
];
