import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useStudyStore } from "@/store/useStudyStore";
import { ENGLISH_WORDS } from "@/data/previewData";
import PageHeader from "@/components/PageHeader";
import StarBurst from "@/components/StarBurst";
import SpeakButton from "@/components/SpeakButton";
import { cn } from "@/lib/utils";

// 从句子中提取英文部分(去掉中文和标点)
function extractEnglish(text: string): string {
  if (!text) return "";
  const matches = text.match(/[a-zA-Z][a-zA-Z' ]*[a-zA-Z]|[a-zA-Z]/g);
  return matches ? matches.join(" ").trim() : "";
}

export default function EnglishPreview() {
  const progress = useStudyStore((s) => s.previewProgress);
  const mark = useStudyStore((s) => s.markPreview);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [burst, setBurst] = useState(0);

  const word = ENGLISH_WORDS[idx];
  const done = progress[`english-${word.id}`];
  const doneCount = ENGLISH_WORDS.filter((w) => progress[`english-${w.id}`]).length;

  const handleMark = () => {
    if (!done) {
      mark("english", word.id);
      setBurst((b) => b + 1);
    }
    next();
  };

  const next = () => {
    if (idx < ENGLISH_WORDS.length - 1) {
      setIdx(idx + 1);
      setFlipped(false);
    }
  };

  const prev = () => {
    if (idx > 0) {
      setIdx(idx - 1);
      setFlipped(false);
    }
  };

  // 例句中的英文部分(去掉中文翻译)
  const sentenceEnglish = extractEnglish(word.sentence);

  return (
    <div className="relative mx-auto max-w-md">
      <StarBurst trigger={burst} x={50} y={25} />

      <Link to="/preview" className="mb-4 flex items-center gap-1 text-ink/60 hover:text-ink">
        <ChevronLeft size={20} /> 返回预习
      </Link>

      <PageHeader emoji="🌈" title="英语新词汇" subtitle="看图记单词,跟读学拼写,轻松又好玩!" accent="bg-gradient-to-r from-mint-200 to-sky2-100" />

      <div className="mb-4 flex items-center justify-between rounded-blob border-2 border-white bg-white p-3 shadow-soft">
        <p className="font-cute text-ink">第 <span className="text-mint-500">{idx + 1}</span> / {ENGLISH_WORDS.length} 个</p>
        <p className="text-sm text-ink/50">已掌握 <span className="text-mint-500">{doneCount}</span></p>
      </div>

      {/* 进度条 */}
      <div className="mb-5 flex gap-1">
        {ENGLISH_WORDS.map((w, i) => (
          <button
            key={w.id}
            onClick={() => { setIdx(i); setFlipped(false); }}
            className={cn(
              "h-2 flex-1 rounded-full transition-all",
              i === idx ? "bg-mint-400" : progress[`english-${w.id}`] ? "bg-mint-300" : "bg-ink/10"
            )}
          />
        ))}
      </div>

      {/* 单词卡片(翻转) */}
      <div className="mb-5" style={{ perspective: "1000px" }}>
        <motion.div
          key={word.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative h-72"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* 正面:emoji + 单词 */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-blob border-2 border-white bg-gradient-to-br from-mint-100 to-sky2-100 p-6 shadow-sticker"
              style={{ backfaceVisibility: "hidden" }}
            >
              <span className="mb-3 text-8xl">{word.emoji}</span>
              <div className="flex items-center gap-2">
                <p className="font-cute text-4xl text-ink">{word.word}</p>
                <SpeakButton text={word.word} size="md" variant="pill" />
              </div>
              <SpeakButton text={word.word} size="md" variant="solid" label="跟读" className="mt-3" />
              <p className="mt-3 text-xs text-ink/40">点击卡片查看中文</p>
            </div>

            {/* 背面:中文 + 例句 */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-blob border-2 border-white bg-gradient-to-br from-sun-100 to-coral-100 p-6 shadow-sticker"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <div className="flex items-center gap-2">
                <p className="font-cute text-4xl text-ink">{word.meaning}</p>
                <SpeakButton text={word.word} size="md" variant="pill" />
              </div>
              <div className="mt-4 rounded-2xl bg-white/70 p-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <p className="text-sm text-ink/80">{word.sentence}</p>
                  {sentenceEnglish && (
                    <SpeakButton text={sentenceEnglish} size="sm" variant="ghost" />
                  )}
                </div>
                <SpeakButton text={sentenceEnglish || word.word} size="sm" variant="solid" label="听句子" className="mt-2" />
              </div>
            </div>
          </motion.div>
        </motion.div>
        <button
          onClick={() => setFlipped((f) => !f)}
          className="mt-3 w-full rounded-full bg-paper py-2 text-sm text-ink/60 hover:text-ink"
        >
          {flipped ? "← 看单词" : "看中文 →"}
        </button>
      </div>

      {/* 操作按钮 */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={prev}
          disabled={idx === 0}
          className="btn-pop bg-paper px-4 py-2.5 text-ink disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={handleMark}
          className={cn("btn-pop flex-1 px-6 py-2.5 text-white", done ? "bg-mint-400" : "bg-coral-400")}
        >
          {done ? <><Check size={18} className="mr-1 inline" /> 已掌握,下一个</> : "我记住啦!"}
        </button>
        <button
          onClick={next}
          disabled={idx === ENGLISH_WORDS.length - 1}
          className="btn-pop bg-paper px-4 py-2.5 text-ink disabled:opacity-30"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
