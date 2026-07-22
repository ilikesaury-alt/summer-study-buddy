import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ChevronLeft, Lightbulb, PenLine, Sparkles } from "lucide-react";
import { useStudyStore } from "@/store/useStudyStore";
import { MATH_PREVIEW_ITEMS } from "@/data/previewData";
import PageHeader from "@/components/PageHeader";
import StarBurst from "@/components/StarBurst";
import { cn } from "@/lib/utils";

export default function MathPreview() {
  const progress = useStudyStore((s) => s.previewProgress);
  const mark = useStudyStore((s) => s.markPreview);
  const [active, setActive] = useState<number | null>(null);
  const [practice, setPractice] = useState("");
  const [checked, setChecked] = useState(false);
  const [burst, setBurst] = useState(0);

  const doneCount = MATH_PREVIEW_ITEMS.filter((i) => progress[`math-${i.id}`]).length;

  if (active !== null) {
    const item = MATH_PREVIEW_ITEMS[active];
    const done = progress[`math-${item.id}`];
    const correct = practice.trim() === item.practice.answer;

    return (
      <div className="relative mx-auto max-w-2xl">
        <StarBurst trigger={burst} x={50} y={20} />
        <button onClick={() => { setActive(null); setPractice(""); setChecked(false); }} className="mb-4 flex items-center gap-1 text-ink/60 hover:text-ink">
          <ChevronLeft size={20} /> 返回目录
        </button>

        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="rounded-blob border-2 border-white bg-white p-6 shadow-sticker">
            <div className="mb-3 flex items-center justify-between">
              <span className="tag-pill bg-sky2-100 text-sky2-500">第 {active + 1} 课 / 共 {MATH_PREVIEW_ITEMS.length} 课</span>
              {done && <span className="tag-pill bg-mint-100 text-mint-500"><Check size={13} className="inline" /> 已学完</span>}
            </div>
            <h2 className="mb-4 font-cute text-3xl text-ink">{item.title}</h2>

            {/* 概念 */}
            <div className="mb-4 rounded-2xl bg-sky2-50 p-4">
              <p className="mb-1 flex items-center gap-1 font-cute text-sky2-500"><Lightbulb size={18} /> 学一学</p>
              <p className="text-sm leading-relaxed text-ink/80">{item.concept}</p>
            </div>

            {/* 例题 */}
            <div className="mb-4 rounded-2xl bg-sun-50 p-4">
              <p className="mb-1 flex items-center gap-1 font-cute text-sun-600"><Sparkles size={18} /> 看例题</p>
              <p className="font-cute text-2xl text-ink">{item.example}</p>
            </div>

            {/* 解题步骤 */}
            <div className="mb-4">
              <p className="mb-2 font-cute text-ink/70">📝 解题步骤:</p>
              <div className="space-y-2">
                {item.steps.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sky2-300 font-cute text-sm text-white">{i + 1}</span>
                    <span className="text-sm text-ink/80">{s}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* 小试身手 */}
          <div className="rounded-blob border-2 border-white bg-gradient-to-br from-mint-50 to-sky2-50 p-6 shadow-sticker">
            <p className="mb-3 flex items-center gap-1 font-cute text-xl text-mint-500"><PenLine size={20} /> 小试身手</p>
            <p className="mb-3 font-cute text-2xl text-ink">{item.practice.question}</p>
            <div className="flex gap-2">
              <input
                value={practice}
                onChange={(e) => { setPractice(e.target.value); setChecked(false); }}
                onKeyDown={(e) => e.key === "Enter" && practice.trim() && setChecked(true)}
                placeholder="输入答案..."
                className="flex-1 rounded-full border-2 border-mint-300 bg-white px-4 py-2 font-cute text-lg text-ink outline-none focus:border-mint-500"
              />
              <button
                onClick={() => practice.trim() && setChecked(true)}
                disabled={!practice.trim()}
                className="btn-pop bg-sky2-400 px-5 py-2 text-white disabled:opacity-40"
              >批改</button>
            </div>
            {checked && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("mt-3 rounded-2xl p-3 text-sm", correct ? "bg-mint-100 text-mint-500" : "bg-coral-50 text-coral-400")}
              >
                {correct ? "🎉 答对啦!真聪明!" : <>差一点哦,正确答案是:<span className="font-bold">{item.practice.answer}</span>,再想想~</>}
              </motion.div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => { if (active > 0) { setActive(active - 1); setPractice(""); setChecked(false); } }}
                disabled={active === 0}
                className="btn-pop bg-paper px-4 py-2 text-ink disabled:opacity-30"
              >上一课</button>
              <button
                onClick={() => {
                  if (!done) { mark("math", item.id); setBurst((b) => b + 1); }
                  if (active < MATH_PREVIEW_ITEMS.length - 1) { setActive(active + 1); setPractice(""); setChecked(false); }
                }}
                className="btn-pop bg-mint-400 px-6 py-2 text-white"
              >
                {done ? "下一课 →" : "学完啦,下一课 →"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // 目录
  return (
    <div>
      <PageHeader emoji="🧮" title="数学新知识" subtitle="三年级数学抢先看,边学边练不害怕!" accent="bg-gradient-to-r from-sky2-200 to-sky2-100" />

      <div className="mb-5 flex items-center justify-between rounded-blob border-2 border-white bg-white p-4 shadow-soft">
        <p className="font-cute text-ink">已学 <span className="text-sky2-500">{doneCount}</span> / {MATH_PREVIEW_ITEMS.length} 课</p>
        <Link to="/preview" className="text-sm text-ink/50 hover:text-ink">← 返回预习</Link>
      </div>

      <div className="space-y-3">
        {MATH_PREVIEW_ITEMS.map((item, idx) => {
          const done = progress[`math-${item.id}`];
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.06 }}
              onClick={() => { setActive(idx); setPractice(""); setChecked(false); }}
              className="group flex w-full items-center gap-4 rounded-blob border-2 border-white bg-white p-4 text-left shadow-sticker transition-all hover:-translate-y-0.5 hover:shadow-pop"
            >
              <span className={cn(
                "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl font-cute text-xl text-white",
                done ? "bg-mint-400" : "bg-sky2-400"
              )}>
                {done ? <Check size={22} strokeWidth={3} /> : idx + 1}
              </span>
              <div className="flex-1">
                <p className="font-cute text-lg text-ink">{item.title}</p>
                <p className="text-xs text-ink/50 line-clamp-1">{item.concept}</p>
              </div>
              <span className="text-2xl opacity-0 transition-opacity group-hover:opacity-100">→</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
