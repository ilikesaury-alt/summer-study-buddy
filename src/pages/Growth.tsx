import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Award, Calendar, Download, Upload, Trophy, Target, PenLine, BookOpen } from "lucide-react";
import { useStudyStore, TOTAL_PREVIEW_ITEMS } from "@/store/useStudyStore";
import { BADGES } from "@/data/badges";
import { getMonthGrid, todayStr } from "@/utils/date";
import PageHeader from "@/components/PageHeader";
import ProgressRing from "@/components/ProgressRing";
import { cn } from "@/lib/utils";

const WEEK = ["日", "一", "二", "三", "四", "五", "六"];

export default function Growth() {
  const { dailyRecords, quizRecords, previewProgress, badges, totalStars, checkinStreak, exportData, importData } = useStudyStore();
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [toast, setToast] = useState("");

  const grid = useMemo(() => getMonthGrid(calYear, calMonth), [calYear, calMonth]);

  // 统计数据
  const totalHomework = Object.values(dailyRecords).reduce((a, r) => a + r.checkedIds.length, 0);
  const totalAnswered = quizRecords.reduce((a, r) => a + r.total, 0);
  const totalCorrect = quizRecords.reduce((a, r) => a + r.score, 0);
  const accuracy = totalAnswered > 0 ? totalCorrect / totalAnswered : 0;
  const previewDone = Object.values(previewProgress).filter(Boolean).length;
  const unlockedBadges = Object.values(badges).filter((b) => b.unlocked).length;

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `暑假学习记录_${todayStr()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("学习数据已导出保存!");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const ok = importData(String(reader.result));
      showToast(ok ? "数据导入成功!" : "导入失败,文件格式不对~");
    };
    reader.readAsText(file);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div>
      <PageHeader emoji="🏅" title="我的成长" subtitle="看看这个暑假你有多厉害!" accent="bg-gradient-to-r from-sun-200 to-coral-100" />

      {/* 数据统计大卡 */}
      <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard icon={<Trophy className="text-sun-500" />} value={totalStars} label="累计星星" bg="bg-sun-100" />
        <StatCard icon={<Award className="text-coral-400" />} value={`${unlockedBadges}/${BADGES.length}`} label="获得勋章" bg="bg-coral-50" />
        <StatCard icon={<Target className="text-mint-500" />} value={checkinStreak} label="连续打卡" bg="bg-mint-50" suffix="天" />
        <StatCard icon={<PenLine className="text-sky2-500" />} value={totalHomework} label="完成作业" bg="bg-sky2-50" />
      </section>

      {/* 答题与预习 */}
      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex items-center gap-4 rounded-blob border-2 border-white bg-white p-5 shadow-sticker">
          <ProgressRing progress={accuracy} size={84} stroke={9} barClassName="text-sky2-400">
            <div className="text-center">
              <p className="font-cute text-lg text-ink">{totalAnswered > 0 ? `${Math.round(accuracy * 100)}%` : "—"}</p>
              <p className="text-[10px] text-ink/50">正确率</p>
            </div>
          </ProgressRing>
          <div>
            <p className="font-cute text-lg text-ink">📚 答题统计</p>
            <p className="text-sm text-ink/60">共答 {totalAnswered} 题</p>
            <p className="text-sm text-ink/60">答对 {totalCorrect} 题</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-blob border-2 border-white bg-white p-5 shadow-sticker">
          <ProgressRing progress={TOTAL_PREVIEW_ITEMS > 0 ? previewDone / TOTAL_PREVIEW_ITEMS : 0} size={84} stroke={9} barClassName="text-mint-400">
            <div className="text-center">
              <p className="font-cute text-lg text-ink">{previewDone}</p>
              <p className="text-[10px] text-ink/50">已预习</p>
            </div>
          </ProgressRing>
          <div>
            <p className="font-cute text-lg text-ink">🌱 预习进度</p>
            <p className="text-sm text-ink/60">已学 {previewDone} 个知识点</p>
            <p className="text-sm text-ink/60">坚持就是超能力!</p>
          </div>
        </div>
      </section>

      {/* 学习日历 */}
      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-cute text-2xl text-ink"><Calendar className="inline" /> 学习日历</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setCalMonth((m) => { if (m === 0) { setCalYear((y) => y - 1); return 11; } return m - 1; }); }}
              className="rounded-full bg-white px-3 py-1 text-ink shadow-soft hover:bg-paper"
            >‹</button>
            <span className="font-cute w-24 text-center text-ink">{calYear}年{calMonth + 1}月</span>
            <button
              onClick={() => { setCalMonth((m) => { if (m === 11) { setCalYear((y) => y + 1); return 0; } return m + 1; }); }}
              className="rounded-full bg-white px-3 py-1 text-ink shadow-soft hover:bg-paper"
            >›</button>
          </div>
        </div>

        <div className="rounded-blob border-2 border-white bg-white p-4 shadow-sticker">
          <div className="mb-2 grid grid-cols-7 gap-1 text-center">
            {WEEK.map((w) => (
              <div key={w} className="font-cute text-xs text-ink/50">{w}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {grid.map((date, i) => {
              if (!date) return <div key={i} className="aspect-square" />;
              const rec = dailyRecords[date];
              const done = rec && rec.checkedIds.length > 0;
              const all = rec && rec.allCompleted;
              const isToday = date === todayStr();
              const day = Number(date.split("-")[2]);
              return (
                <div
                  key={date}
                  className={cn(
                    "relative flex aspect-square items-center justify-center rounded-xl text-sm transition-all",
                    isToday && "ring-2 ring-sun-400",
                    all ? "bg-mint-100" : done ? "bg-sun-50" : "bg-paper",
                  )}
                  title={done ? `${date} 完成 ${rec!.checkedIds.length} 项` : date}
                >
                  <span className={cn("font-cute", done ? "text-ink" : "text-ink/40")}>{day}</span>
                  {done && (
                    <span className="absolute bottom-0.5 text-xs">
                      {all ? "⭐" : "✓"}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-ink/50">
            <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded bg-mint-100" /> 全部完成</span>
            <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded bg-sun-50" /> 部分完成</span>
            <span className="flex items-center gap-1">⭐ 全完成日</span>
          </div>
        </div>
      </section>

      {/* 勋章墙 */}
      <section className="mb-6">
        <h2 className="mb-3 font-cute text-2xl text-ink"><Award className="inline" /> 勋章墙</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {BADGES.map((b, idx) => {
            const unlocked = badges[b.id]?.unlocked;
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.04 }}
                className={cn(
                  "rounded-blob border-2 p-4 text-center transition-all",
                  unlocked
                    ? "border-sun-300 bg-gradient-to-br from-sun-50 to-white shadow-pop"
                    : "border-ink/10 bg-white/40"
                )}
              >
                <div className={cn("text-4xl", !unlocked && "grayscale opacity-40")}>
                  {unlocked ? b.emoji : "🔒"}
                </div>
                <p className={cn("mt-1 font-cute text-sm", unlocked ? "text-ink" : "text-ink/40")}>{b.name}</p>
                <p className="text-[10px] leading-tight text-ink/50">{b.desc}</p>
                {unlocked && badges[b.id]?.unlockedDate && (
                  <p className="mt-1 text-[10px] text-sun-500">{badges[b.id].unlockedDate}</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 数据管理 */}
      <section className="rounded-blob border-2 border-white bg-white p-5 shadow-sticker">
        <h2 className="mb-3 font-cute text-xl text-ink"><BookOpen className="inline" /> 数据管理</h2>
        <p className="mb-3 text-sm text-ink/60">学习数据保存在本机浏览器里,换电脑前记得导出备份哦!</p>
        <div className="flex flex-wrap gap-3">
          <button onClick={handleExport} className="btn-pop bg-sky2-400 px-5 py-2 text-white">
            <Download size={16} className="mr-1 inline" /> 导出数据
          </button>
          <label className="btn-pop bg-mint-300 px-5 py-2 text-ink cursor-pointer">
            <Upload size={16} className="mr-1 inline" /> 导入数据
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </section>

      {/* toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-6 py-2 font-cute text-white shadow-pop"
        >
          {toast}
        </motion.div>
      )}
    </div>
  );
}

function StatCard({ icon, value, label, bg, suffix = "" }: { icon: React.ReactNode; value: number | string; label: string; bg: string; suffix?: string }) {
  return (
    <div className={cn("rounded-blob border-2 border-white p-4 shadow-sticker", bg)}>
      <div className="mb-1 flex items-center justify-between">
        {icon}
      </div>
      <p className="font-cute text-2xl text-ink">{value}{suffix}</p>
      <p className="text-xs text-ink/60">{label}</p>
    </div>
  );
}
