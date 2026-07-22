import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, Eye, EyeOff, RotateCcw } from "lucide-react";
import { useStudyStore } from "@/store/useStudyStore";
import { DICTATION_ITEMS } from "@/data/previewData";
import PageHeader from "@/components/PageHeader";
import StarBurst from "@/components/StarBurst";
import { cn } from "@/lib/utils";

export default function Dictation() {
  const progress = useStudyStore((s) => s.previewProgress);
  const mark = useStudyStore((s) => s.markPreview);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"look" | "write" | "check">("look");
  const [input, setInput] = useState("");
  const [burst, setBurst] = useState(0);

  const item = DICTATION_ITEMS[idx];
  const done = progress[`dictation-${item.id}`];
  const doneCount = DICTATION_ITEMS.filter((i) => progress[`dictation-${i.id}`]).length;

  const goNext = () => {
    if (idx < DICTATION_ITEMS.length - 1) {
      setIdx(idx + 1);
      setPhase("look");
      setInput("");
    }
  };

  const handleMarkDone = () => {
    if (!done) {
      mark("dictation", item.id);
      setBurst((b) => b + 1);
    }
    goNext();
  };

  const restart = () => {
    setIdx(0);
    setPhase("look");
    setInput("");
  };

  const correct = input.trim() === item.word;

  return (
    <div className="relative mx-auto max-w-xl">
      <StarBurst trigger={burst} x={50} y={25} />

      <Link to="/preview" className="mb-4 flex items-center gap-1 text-ink/60 hover:text-ink">
        <ChevronLeft size={20} /> 返回预习
      </Link>

      <PageHeader emoji="✍️" title="默写练习" subtitle="先看词,再遮盖默写,最后对照批改!" accent="bg-gradient-to-r from-sun-200 to-sun-100" />

      <div className="mb-4 flex items-center justify-between rounded-blob border-2 border-white bg-white p-3 shadow-soft">
        <p className="font-cute text-ink">第 <span className="text-sun-500">{idx + 1}</span> / {DICTATION_ITEMS.length} 个</p>
        <p className="text-sm text-ink/50">已掌握 <span className="text-mint-500">{doneCount}</span></p>
      </div>

      {/* 进度条 */}
      <div className="mb-5 flex gap-1">
        {DICTATION_ITEMS.map((d, i) => (
          <button
            key={d.id}
            onClick={() => { setIdx(i); setPhase("look"); setInput(""); }}
            className={cn(
              "h-2 flex-1 rounded-full transition-all",
              i === idx ? "bg-sun-400" : progress[`dictation-${d.id}`] ? "bg-mint-400" : "bg-ink/10"
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={item.id + phase}
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: -90 }}
          className="rounded-blob border-2 border-white bg-white p-6 shadow-sticker"
        >
          {phase === "look" && (
            <div className="text-center">
              <p className="mb-2 text-sm text-ink/50">第一步:认真看这个词</p>
              <p className="my-6 font-cute text-6xl text-ink">{item.word}</p>
              {item.hint && <p className="mb-4 text-sm text-ink/60">💡 {item.hint}</p>}
              <button onClick={() => setPhase("write")} className="btn-pop bg-sun-400 px-8 py-3 text-lg text-white">
                看好了,遮盖默写 →
              </button>
            </div>
          )}

          {phase === "write" && (
            <div className="text-center">
              <p className="mb-2 text-sm text-ink/50">第二步:不看上面,在田字格里默写</p>
              <div className="mx-auto mb-4 flex max-w-xs flex-wrap justify-center gap-2">
                {item.word.split("").map((ch, i) => (
                  <div key={i} className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed border-sun-300 bg-sun-50">
                    <span className="font-cute text-3xl text-ink/30">田</span>
                  </div>
                ))}
              </div>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && input.trim() && setPhase("check")}
                placeholder="输入你默写的词语..."
                autoFocus
                className="w-full rounded-2xl border-2 border-sun-300 bg-sun-50 px-4 py-3 text-center font-cute text-2xl text-ink outline-none focus:border-sun-500"
              />
              <button
                onClick={() => setPhase("check")}
                disabled={!input.trim()}
                className="btn-pop mt-4 bg-mint-400 px-8 py-2.5 text-white disabled:opacity-40"
              >
                默写完了,对照批改 →
              </button>
            </div>
          )}

          {phase === "check" && (
            <div className="text-center">
              <p className="mb-2 text-sm text-ink/50">第三步:对照批改</p>
              <div className="my-4 flex items-center justify-center gap-6">
                <div>
                  <p className="text-xs text-ink/50">你写的</p>
                  <p className={cn("font-cute text-4xl", correct ? "text-mint-500" : "text-coral-400")}>{input || "(空)"}</p>
                </div>
                <span className="text-2xl text-ink/30">vs</span>
                <div>
                  <p className="text-xs text-ink/50">正确答案</p>
                  <p className="font-cute text-4xl text-ink">{item.word}</p>
                </div>
              </div>
              <div className={cn("mb-4 rounded-2xl p-3 text-sm", correct ? "bg-mint-50 text-mint-500" : "bg-coral-50 text-coral-400")}>
                {correct ? "🎉 全对!真厉害!" : "差一点点,多写几遍就记住啦!"}
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <button onClick={() => { setPhase("look"); setInput(""); }} className="btn-pop bg-sky2-100 px-5 py-2 text-sky2-500">
                  <RotateCcw size={16} className="mr-1 inline" /> 再练一次
                </button>
                <button onClick={handleMarkDone} className="btn-pop bg-mint-400 px-6 py-2 text-white">
                  <Check size={16} className="mr-1 inline" /> 已掌握,下一个
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* 底部操作 */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          <button onClick={() => { if (idx > 0) { setIdx(idx - 1); setPhase("look"); setInput(""); } }} disabled={idx === 0} className="btn-pop bg-paper px-4 py-1.5 text-ink disabled:opacity-30">上一个</button>
          <button onClick={() => { setPhase(phase === "look" ? "write" : phase === "write" ? "check" : "look"); }} className="text-sm text-ink/50 hover:text-ink">
            {phase === "look" ? <><EyeOff size={14} className="inline" /> 遮盖</> : <><Eye size={14} className="inline" /> 显示</>}
          </button>
        </div>
        <button onClick={restart} className="text-sm text-ink/50 hover:text-ink"><RotateCcw size={14} className="inline" /> 重新开始</button>
      </div>
    </div>
  );
}
