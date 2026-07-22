import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, Eye, EyeOff, Flag } from "lucide-react";
import { useStudyStore } from "@/store/useStudyStore";
import { RECITE_ITEMS } from "@/data/previewData";
import PageHeader from "@/components/PageHeader";
import StarBurst from "@/components/StarBurst";
import { cn } from "@/lib/utils";

export default function ChineseRecite() {
  const progress = useStudyStore((s) => s.previewProgress);
  const mark = useStudyStore((s) => s.markPreview);
  const [active, setActive] = useState<number | null>(null);
  const [hide, setHide] = useState(false);
  const [burst, setBurst] = useState(0);

  const doneCount = RECITE_ITEMS.filter((i) => progress[`chinese-recite-${i.id}`]).length;

  const handleDone = (id: string) => {
    if (!progress[`chinese-recite-${id}`]) {
      mark("chinese-recite", id);
      setBurst((b) => b + 1);
    }
  };

  // 详情视图
  if (active !== null) {
    const item = RECITE_ITEMS[active];
    const done = progress[`chinese-recite-${item.id}`];
    const prevDisabled = active === 0;
    const nextDisabled = active === RECITE_ITEMS.length - 1;
    return (
      <div className="relative mx-auto max-w-2xl">
        <StarBurst trigger={burst} x={50} y={20} />
        <button onClick={() => setActive(null)} className="mb-4 flex items-center gap-1 text-ink/60 hover:text-ink">
          <ChevronLeft size={20} /> 返回关卡列表
        </button>

        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="overflow-hidden rounded-blob border-2 border-white bg-white p-6 shadow-sticker"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="tag-pill bg-coral-100 text-coral-500">第 {active + 1} 关 / 共 {RECITE_ITEMS.length} 关</span>
            <button
              onClick={() => setHide((h) => !h)}
              className="btn-pop bg-sky2-100 px-3 py-1.5 text-sm text-sky2-500"
            >
              {hide ? <><Eye size={15} className="mr-1 inline" /> 显示原文</> : <><EyeOff size={15} className="mr-1 inline" /> 遮盖背诵</>}
            </button>
          </div>

          <h2 className="font-cute text-3xl text-ink">{item.title}</h2>
          {item.author && <p className="text-sm text-ink/50">{item.author}</p>}

          <div className={cn("my-5 rounded-2xl bg-coral-50 p-5 transition-all", hide && "blur-sm select-none")}>
            <pre className="whitespace-pre-wrap font-cute text-xl leading-loose text-ink">{item.content}</pre>
          </div>

          {item.tip && (
            <div className="mb-4 rounded-2xl bg-sun-50 p-3 text-sm text-ink/70">
              💡 <span className="font-bold">背诵小贴士:</span>{item.tip}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                disabled={prevDisabled}
                onClick={() => { setActive(active - 1); setHide(false); }}
                className="btn-pop bg-paper px-4 py-2 text-ink disabled:opacity-30"
              >上一关</button>
              <button
                disabled={nextDisabled}
                onClick={() => { setActive(active + 1); setHide(false); }}
                className="btn-pop bg-sky2-100 px-4 py-2 text-sky2-500 disabled:opacity-30"
              >下一关</button>
            </div>
            <button
              onClick={() => handleDone(item.id)}
              disabled={done}
              className={cn(
                "btn-pop px-6 py-2.5 text-white",
                done ? "bg-mint-400" : "bg-coral-400"
              )}
            >
              {done ? <><Check size={18} className="mr-1 inline" /> 已背熟</> : <><Flag size={18} className="mr-1 inline" /> 我背熟了!</>}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 关卡列表
  return (
    <div>
      <PageHeader emoji="📜" title="语文必背闯关" subtitle="一首首古诗,一关关挑战,背下来就是你的!" accent="bg-gradient-to-r from-coral-200 to-sun-100" />

      <div className="mb-5 flex items-center justify-between rounded-blob border-2 border-white bg-white p-4 shadow-soft">
        <p className="font-cute text-ink">已通关 <span className="text-coral-400">{doneCount}</span> / {RECITE_ITEMS.length} 关</p>
        <Link to="/preview" className="text-sm text-ink/50 hover:text-ink">← 返回预习</Link>
      </div>

      {/* 关卡路径图 */}
      <div className="relative space-y-4">
        {RECITE_ITEMS.map((item, idx) => {
          const done = progress[`chinese-recite-${item.id}`];
          const locked = idx > 0 && !progress[`chinese-recite-${RECITE_ITEMS[idx - 1].id}`] && !done;
          const side = idx % 2 === 0 ? "ml-0" : "ml-auto";
          return (
            <div key={item.id} className={`relative max-w-[85%] ${side}`}>
              {/* 连接线 */}
              {idx < RECITE_ITEMS.length - 1 && (
                <div className="absolute left-6 top-full h-4 w-1 bg-coral-200" />
              )}
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                disabled={locked}
                onClick={() => setActive(idx)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-blob border-2 p-4 text-left transition-all",
                  locked ? "border-ink/10 bg-white/40 opacity-60" : "border-white bg-white shadow-sticker hover:-translate-y-0.5 hover:shadow-pop",
                  done && "border-mint-200"
                )}
              >
                <span className={cn(
                  "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full font-cute text-lg text-white",
                  done ? "bg-mint-400" : locked ? "bg-ink/20" : "bg-coral-400"
                )}>
                  {done ? <Check size={22} strokeWidth={3} /> : locked ? "🔒" : idx + 1}
                </span>
                <div className="flex-1">
                  <p className="font-cute text-lg text-ink">{item.title}</p>
                  {item.author && <p className="text-xs text-ink/50">{item.author}</p>}
                </div>
                {done && <span className="text-2xl">⭐</span>}
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
