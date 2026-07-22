import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Badge,
  DailyRecord,
  HomeworkItem,
  PreviewModule,
  QuizRecord,
  Subject,
  WrongQuestion,
} from "@/types";
import { BADGES } from "@/data/badges";
import { todayStr, computeStreak } from "@/utils/date";
import { calcStars, isCorrect } from "@/utils/quizEngine";
import type { Question } from "@/types";

// 默认今日作业模板
function defaultHomework(): HomeworkItem[] {
  return [
    { id: "hw-cn-1", subject: "chinese", title: "暑假语文作业 1 页", detail: "完成当天页码并检查" },
    { id: "hw-math-1", subject: "math", title: "暑假数学作业 1 页", detail: "认真计算,做完检查一遍" },
    { id: "hw-en-1", subject: "english", title: "英语听读 15 分钟", detail: "跟读课文录音" },
    { id: "hw-read-1", subject: "other", title: "课外阅读 20 分钟", detail: "读一本喜欢的书" },
    { id: "hw-sport-1", subject: "other", title: "运动 30 分钟", detail: "跳绳 / 跑步 / 球类" },
  ];
}

function emptyBadges(): Record<string, Badge> {
  const obj: Record<string, Badge> = {};
  BADGES.forEach((b) => {
    obj[b.id] = { ...b, unlocked: false, unlockedDate: null };
  });
  return obj;
}

interface StudyState {
  studentName: string;
  totalStars: number;
  checkinStreak: number;
  lastCheckinDate: string | null;

  dailyRecords: Record<string, DailyRecord>;
  quizRecords: QuizRecord[];
  wrongQuestions: WrongQuestion[];
  previewProgress: Record<string, boolean>; // key: module-itemId
  badges: Record<string, Badge>;

  // 派生:今日
  getToday: () => DailyRecord;
  ensureToday: () => void;
  toggleHomework: (itemId: string) => void;
  addCustomHomework: (item: Omit<HomeworkItem, "id">) => void;

  recordQuiz: (subject: Subject, questions: Question[], userAnswers: string[], durationSec: number) => QuizRecord;
  removeWrongQuestion: (id: string) => void;
  clearWrongQuestions: () => void;

  markPreview: (module: PreviewModule, itemId: string) => void;
  unmarkPreview: (module: PreviewModule, itemId: string) => void;

  setStudentName: (name: string) => void;
  addStars: (count: number) => void;

  checkBadges: () => void;
  exportData: () => string;
  importData: (json: string) => boolean;
  resetAll: () => void;
}

function badgeKey(module: PreviewModule, itemId: string): string {
  return `${module}-${itemId}`;
}

export const useStudyStore = create<StudyState>()(
  persist(
    (set, get) => ({
      studentName: "小同学",
      totalStars: 0,
      checkinStreak: 0,
      lastCheckinDate: null,

      dailyRecords: {},
      quizRecords: [],
      wrongQuestions: [],
      previewProgress: {},
      badges: emptyBadges(),

      getToday: () => {
        const date = todayStr();
        const rec = get().dailyRecords[date];
        if (rec) return rec;
        return {
          date,
          homework: defaultHomework(),
          checkedIds: [],
          allCompleted: false,
        };
      },

      ensureToday: () => {
        const date = todayStr();
        const records = get().dailyRecords;
        if (!records[date]) {
          set({
            dailyRecords: {
              ...records,
              [date]: {
                date,
                homework: defaultHomework(),
                checkedIds: [],
                allCompleted: false,
              },
            },
          });
        }
      },

      toggleHomework: (itemId) => {
        get().ensureToday();
        const date = todayStr();
        const records = { ...get().dailyRecords };
        const today = { ...records[date] };
        const checked = new Set(today.checkedIds);
        const wasAllCompleted = today.allCompleted;
        const wasChecked = checked.has(itemId);
        if (wasChecked) {
          checked.delete(itemId);
        } else {
          checked.add(itemId);
        }
        today.checkedIds = Array.from(checked);
        today.allCompleted = today.homework.every((h) => checked.has(h.id));
        records[date] = today;
        set({ dailyRecords: records });

        if (!wasChecked) {
          // 勾选:+1 星
          get().addStars(1);
          // 首次打卡
          if (!get().lastCheckinDate) {
            set({ lastCheckinDate: date, checkinStreak: 1 });
            get().checkBadges();
          } else if (get().lastCheckinDate !== date) {
            // 当天首次勾选,推进连续打卡
            const newStreak = computeStreak(get().lastCheckinDate, get().checkinStreak) + 1;
            set({ lastCheckinDate: date, checkinStreak: newStreak });
            get().checkBadges();
          }
          // 从未全部完成 → 全部完成,额外 +5 星
          if (!wasAllCompleted && today.allCompleted) {
            get().addStars(5);
            get().checkBadges();
          }
        } else {
          // 取消勾选:-1 星
          get().addStars(-1);
          // 从全部完成 → 不再全完成,扣回额外 5 星
          if (wasAllCompleted && !today.allCompleted) {
            get().addStars(-5);
          }
        }
      },

      addCustomHomework: (item) => {
        get().ensureToday();
        const date = todayStr();
        const records = { ...get().dailyRecords };
        const today = { ...records[date] };
        const id = `hw-custom-${Date.now()}`;
        today.homework = [...today.homework, { ...item, id }];
        records[date] = today;
        set({ dailyRecords: records });
      },

      recordQuiz: (subject, questions, userAnswers, durationSec) => {
        let correct = 0;
        const wrongs: WrongQuestion[] = [];
        questions.forEach((q, i) => {
          const ua = userAnswers[i] || "";
          if (isCorrect(q, ua)) {
            correct++;
          } else {
            wrongs.push({
              id: `wq-${Date.now()}-${i}`,
              subject: q.subject,
              stem: q.stem,
              options: q.options,
              answer: q.answer,
              explanation: q.explanation,
              wrongCount: 1,
              lastWrongDate: todayStr(),
            });
          }
        });
        const stars = calcStars(correct, questions.length);
        const record: QuizRecord = {
          id: `qr-${Date.now()}`,
          subject,
          date: todayStr(),
          score: correct,
          total: questions.length,
          durationSec,
          earnedStars: stars,
        };
        set({
          quizRecords: [...get().quizRecords, record],
          wrongQuestions: [...get().wrongQuestions, ...wrongs],
        });
        get().addStars(stars);
        get().checkBadges();
        return record;
      },

      removeWrongQuestion: (id) => {
        set({ wrongQuestions: get().wrongQuestions.filter((w) => w.id !== id) });
        get().checkBadges();
      },

      clearWrongQuestions: () => {
        set({ wrongQuestions: [] });
        get().checkBadges();
      },

      markPreview: (module, itemId) => {
        const key = badgeKey(module, itemId);
        const progress = { ...get().previewProgress };
        if (progress[key]) return;
        progress[key] = true;
        set({ previewProgress: progress });
        get().addStars(3);
        get().checkBadges();
      },

      unmarkPreview: (module, itemId) => {
        const key = badgeKey(module, itemId);
        const progress = { ...get().previewProgress };
        delete progress[key];
        set({ previewProgress: progress });
      },

      setStudentName: (name) => set({ studentName: name || "小同学" }),

      addStars: (count) => {
        const next = Math.max(0, get().totalStars + count);
        set({ totalStars: next });
        if (count > 0) get().checkBadges();
      },

      checkBadges: () => {
        const s = get();
        const badges = { ...s.badges };
        const unlock = (id: string) => {
          if (!badges[id] || badges[id].unlocked) return;
          badges[id] = { ...badges[id], unlocked: true, unlockedDate: todayStr() };
        };
        if (s.lastCheckinDate) unlock("first-checkin");
        if (s.checkinStreak >= 7) unlock("streak-7");
        if (s.checkinStreak >= 21) unlock("streak-21");
        if (s.checkinStreak >= 30) unlock("streak-30");
        const totalAnswered = s.quizRecords.reduce((a, r) => a + r.total, 0);
        if (totalAnswered >= 100) unlock("quiz-100");
        if (s.quizRecords.some((r) => r.score === r.total)) unlock("perfect-score");
        if (s.wrongQuestions.length === 0 && s.quizRecords.length > 0) unlock("wrong-clear");
        const previewCount = Object.keys(s.previewProgress).length;
        if (previewCount >= TOTAL_PREVIEW_ITEMS / 2) unlock("preview-half");
        if (previewCount >= TOTAL_PREVIEW_ITEMS) unlock("preview-all");
        if (s.totalStars >= 100) unlock("star-100");
        if (s.totalStars >= 500) unlock("star-500");
        set({ badges });
      },

      exportData: () => {
        const s = get();
        const { studentName, totalStars, checkinStreak, lastCheckinDate, dailyRecords, quizRecords, wrongQuestions, previewProgress, badges } = s;
        return JSON.stringify(
          { studentName, totalStars, checkinStreak, lastCheckinDate, dailyRecords, quizRecords, wrongQuestions, previewProgress, badges, exportedAt: new Date().toISOString() },
          null,
          2
        );
      },

      importData: (json) => {
        try {
          const data = JSON.parse(json);
          // 合并勋章:以默认定义为基准,保留导入数据的解锁状态
          const baseBadges = emptyBadges();
          const importedBadges = data.badges ?? {};
          const mergedBadges: Record<string, Badge> = {};
          Object.keys(baseBadges).forEach((id) => {
            const base = baseBadges[id];
            const imp = importedBadges[id];
            if (imp) {
              mergedBadges[id] = {
                ...base,
                unlocked: !!imp.unlocked,
                unlockedDate: imp.unlockedDate ?? null,
              };
            } else {
              mergedBadges[id] = base;
            }
          });
          set({
            studentName: data.studentName ?? "小同学",
            totalStars: data.totalStars ?? 0,
            checkinStreak: data.checkinStreak ?? 0,
            lastCheckinDate: data.lastCheckinDate ?? null,
            dailyRecords: data.dailyRecords ?? {},
            quizRecords: data.quizRecords ?? [],
            wrongQuestions: data.wrongQuestions ?? [],
            previewProgress: data.previewProgress ?? {},
            badges: mergedBadges,
          });
          // 导入后重新检查勋章,修复不一致
          get().checkBadges();
          return true;
        } catch {
          return false;
        }
      },

      resetAll: () => {
        set({
          studentName: "小同学",
          totalStars: 0,
          checkinStreak: 0,
          lastCheckinDate: null,
          dailyRecords: {},
          quizRecords: [],
          wrongQuestions: [],
          previewProgress: {},
          badges: emptyBadges(),
        });
      },
    }),
    {
      name: "summer-study-buddy",
      version: 1,
      // 升级时合并默认勋章,避免新增勋章后旧用户无法解锁
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<StudyState>;
        const baseBadges = emptyBadges();
        const oldBadges = (p.badges ?? {}) as Record<string, Badge>;
        const mergedBadges: Record<string, Badge> = {};
        Object.keys(baseBadges).forEach((id) => {
          const base = baseBadges[id];
          const old = oldBadges[id];
          mergedBadges[id] = old
            ? { ...base, unlocked: old.unlocked, unlockedDate: old.unlockedDate }
            : base;
        });
        return {
          ...current,
          ...p,
          badges: mergedBadges,
        } as StudyState;
      },
    }
  )
);

// 预习内容总数(用于勋章判定)
import { RECITE_ITEMS, DICTATION_ITEMS, MATH_PREVIEW_ITEMS, ENGLISH_WORDS } from "@/data/previewData";
export const TOTAL_PREVIEW_ITEMS =
  RECITE_ITEMS.length + DICTATION_ITEMS.length + MATH_PREVIEW_ITEMS.length + ENGLISH_WORDS.length;
