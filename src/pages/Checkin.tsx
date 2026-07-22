import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Flame, Plus, X } from "lucide-react";
import { useStudyStore } from "@/store/useStudyStore";
import { SUBJECT_INFO, DAILY_TIPS } from "@/data/badges";
import { dateCN, weekdayCN, todayStr } from "@/utils/date";
import { cn } from "@/lib/utils";
import ProgressRing from "@/components/ProgressRing";
import StarBurst from "@/components/StarBurst";
import Confetti from "@/components/Confetti";
import type { HomeworkItem, Subject } from "@/types";

export default function Checkin() {
  const { getToday, toggleHomework, addCustomHomework, checkinStreak, ensureToday } = useStudyStore();
  const today = getToday();
  const [burst, setBurst] = useState(0);
  const [celebrate, setCelebrate] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState<Subject | "other">("other");

  useEffect(() => {
    ensureToday();
  }, [ensureToday]);

  const checkedSet = useMemo(() => new Set(today.checkedIds), [today.checkedIds]);
  const doneCount = today.homework.filter((h) => checkedSet.has(h.id)).length;
  const total = today.homework.length;
  const progress = total > 0 ? doneCount / total : 0;
  const allDone = doneCount === total && total > 0;

  // 每日寄语(按日期固定)
  const tip = useMemo(() => {
    const seed = todayStr().split("-").reduce((a, b) => a + Number(b), 0);
    return DAILY_TIPS[seed % DAILY_TIPS.length];
  }, []);

  const handleToggle = (item: HomeworkItem) => {
    const wasDone = checkedSet.has(item.id);
    toggleHomework(item.id);
    if (!wasDone) {
      setBurst((b) => b + 1);
      // 检查是否变成全完成
      const willDone = doneCount + 1;
      if (willDone === total) {
        setTimeout(() => setCelebrate((c) => c + 1), 200);
      }
    }
  };

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addCustomHomework({ subject: newSubject, title: newTitle.trim() });
    setNewTitle("");
    setNewSubject("other");
    setShowAdd(false);
  };

  return (
    <div className="relative">
      <StarBurst trigger={burst} x={50} y={30} />
      <Confetti trigger={celebrate} />

      {/* 仪表盘 */}
      <section className="relative mb-6 overflow-hidden rounded-blob border-2 border-white bg-gradient-to-br from-sky2-100 via-sun-50 to-mint-100 p-6 shadow-sticker">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="animate-float text-5xl">☀️</span>
            <div>
              <p className="font-cute text-2xl text-ink">{dateCN()}</p>
              <p className="text-sm font-medium text-ink/60">{weekdayCN()}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <ProgressRing progress={progress} size={92} stroke={10} barClassName="text-coral-300">
              <div className="text-center">
                <p className="font-cute text-xl text-ink">{doneCount}/{total}</p>
                <p className="text-[10px] text-ink/50">完成</p>
              </div>
            </ProgressRing>

            <div className="flex flex-col items-center rounded-2xl bg-white/70 px-4 py-2 shadow-soft">
              <div className="flex items-center gap-1">
                <Flame className="text-coral-400" size={22} fill="currentColor" />
                <span className="font-cute text-3xl text-coral-400">{checkinStreak}</span>
              </div>
              <p className="text-[11px] font-medium text-ink/60">连续打卡</p>
            </div>
          </div>
        </div>

        {allDone && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-4 rounded-2xl bg-coral-300/90 px-4 py-2 text-center font-cute text-white shadow-pop"
          >
            🎉 太棒啦!今天的作业全部完成,获得 5 颗额外星星!
          </motion.div>
        )}
      </section>

      {/* 今日作业清单 */}
      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-cute text-2xl text-ink">📝 今日作业清单</h2>
          <button
            onClick={() => setShowAdd((s) => !s)}
            className="btn-pop bg-mint-300 px-3 py-1.5 text-sm text-ink"
          >
            <Plus size={16} className="inline" /> 添加
          </button>
        </div>

        {showAdd && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="mb-3 overflow-hidden rounded-blob border-2 border-mint-200 bg-white p-4 shadow-sticker"
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                placeholder="输入作业内容..."
                className="flex-1 rounded-full border-2 border-mint-200 bg-mint-50 px-4 py-2 text-ink outline-none focus:border-mint-400"
              />
              <select
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value as Subject | "other")}
                className="rounded-full border-2 border-mint-200 bg-mint-50 px-3 py-2 text-ink outline-none"
              >
                <option value="other">🎒 其他</option>
                <option value="chinese">📚 语文</option>
                <option value="math">🔢 数学</option>
                <option value="english">🔤 英语</option>
              </select>
              <button onClick={handleAdd} className="btn-pop bg-mint-400 px-4 py-2 text-white">
                确定
              </button>
              <button onClick={() => setShowAdd(false)} className="btn-pop bg-paper px-3 py-2 text-ink">
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}

        <div className="space-y-3">
          {today.homework.map((item, idx) => {
            const info = SUBJECT_INFO[item.subject];
            const done = checkedSet.has(item.id);
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleToggle(item)}
                className={cn(
                  "group flex w-full items-center gap-4 rounded-blob border-2 p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-pop",
                  done
                    ? "border-white bg-white/60 shadow-soft"
                    : "border-white bg-white shadow-sticker"
                )}
              >
                <span className={cn("text-3xl", done && "grayscale")}>{info.emoji}</span>
                <div className="flex-1">
                  <p className={cn("font-cute text-lg text-ink", done && "text-ink/40 line-through")}>
                    {item.title}
                  </p>
                  {item.detail && (
                    <p className={cn("text-xs text-ink/50", done && "line-through")}>{item.detail}</p>
                  )}
                </div>
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all",
                    done
                      ? "border-mint-400 bg-mint-400 text-white"
                      : "border-ink/20 bg-white text-transparent group-hover:border-mint-300"
                  )}
                >
                  <Check size={20} strokeWidth={3} className={done ? "animate-pop" : ""} />
                </span>
              </motion.button>
            );
          })}
          {today.homework.length === 0 && (
            <div className="rounded-blob border-2 border-dashed border-ink/20 bg-white/50 p-8 text-center text-ink/40">
              今天还没有作业,点击“添加”来记录吧~
            </div>
          )}
        </div>
      </section>

      {/* 快捷功能入口 */}
      <section className="mb-6">
        <h2 className="mb-3 font-cute text-2xl text-ink">🚀 快去学习闯关</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <QuickCard to="/review" emoji="📖" title="复习出题" desc="二年级知识闯关" tilt="tilt-l" bg="from-sky2-200 to-sky2-300" />
          <QuickCard to="/preview" emoji="🌱" title="预习新知识" desc="三年级新课抢先学" tilt="tilt-r" bg="from-mint-200 to-mint-300" />
          <QuickCard to="/growth" emoji="🏅" title="我的成长" desc="勋章和数据" tilt="tilt-l" bg="from-sun-200 to-coral-200" />
        </div>
      </section>

      {/* 每日寄语 */}
      <section className="relative overflow-hidden rounded-blob border-2 border-white bg-gradient-to-r from-sun-100 to-coral-100 p-5 shadow-sticker">
        <span className="absolute right-4 top-2 text-4xl opacity-30">💭</span>
        <p className="font-cute text-sm leading-relaxed text-ink/80">💡 {tip}</p>
      </section>
    </div>
  );
}

function QuickCard({
  to,
  emoji,
  title,
  desc,
  tilt,
  bg,
}: {
  to: string;
  emoji: string;
  title: string;
  desc: string;
  tilt: string;
  bg: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group relative block overflow-hidden rounded-blob border-2 border-white bg-gradient-to-br p-5 shadow-sticker transition-all hover:-translate-y-1 hover:shadow-pop",
        tilt,
        bg
      )}
    >
      <span className="text-4xl transition-transform group-hover:scale-110">{emoji}</span>
      <p className="mt-2 font-cute text-xl text-ink">{title}</p>
      <p className="text-xs text-ink/60">{desc}</p>
      <span className="absolute -bottom-3 -right-3 text-6xl opacity-10">{emoji}</span>
    </Link>
  );
}
