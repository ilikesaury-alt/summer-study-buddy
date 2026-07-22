import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Eye, Trash2 } from "lucide-react";
import { useStudyStore } from "@/store/useStudyStore";
import { SUBJECT_INFO, SUBJECT_CLASSES } from "@/data/badges";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/PageHeader";
import EmptyHint from "@/components/EmptyHint";
import SpeakButton from "@/components/SpeakButton";

// 提取文本中的英文片段用于发音
function extractEnglish(text: string): string {
  if (!text) return "";
  const matches = text.match(/[a-zA-Z][a-zA-Z' ]*[a-zA-Z]|[a-zA-Z]/g);
  return matches ? matches.join(" ").trim() : "";
}

export default function WrongBook() {
  const wrongs = useStudyStore((s) => s.wrongQuestions);
  const remove = useStudyStore((s) => s.removeWrongQuestion);
  const clearAll = useStudyStore((s) => s.clearWrongQuestions);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealed((r) => ({ ...r, [id]: !r[id] }));
  };

  const handleMastered = (id: string) => {
    remove(id);
    setRevealed((r) => {
      const n = { ...r };
      delete n[id];
      return n;
    });
  };

  return (
    <div>
      <PageHeader
        emoji="📒"
        title="我的错题本"
        subtitle="把错题弄懂,就是进步最快的方法!"
        accent="bg-gradient-to-r from-coral-200 to-coral-100"
      />

      {wrongs.length === 0 ? (
        <EmptyHint emoji="🎉" title="错题本空空如也" desc="还没有错题,继续保持!去闯关挑战一下吧~" to="/review" btnText="去闯关" />
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="font-cute text-ink">共 <span className="text-coral-400">{wrongs.length}</span> 道错题</p>
            <button
              onClick={() => {
                if (confirm("确定要清空所有错题吗?清空后可获得“错题清零”勋章哦!")) clearAll();
              }}
              className="btn-pop bg-coral-100 px-4 py-1.5 text-sm text-coral-500"
            >
              <Trash2 size={15} className="mr-1 inline" /> 全部清空
            </button>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {wrongs.map((w, idx) => {
                const info = SUBJECT_INFO[w.subject];
                const isRevealed = revealed[w.id];
                return (
                  <motion.div
                    key={w.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, x: -50 }}
                    transition={{ delay: idx * 0.03 }}
                    className="overflow-hidden rounded-blob border-2 border-white bg-white p-4 shadow-sticker"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className={cn("tag-pill", SUBJECT_CLASSES[w.subject].tag)}>
                        {info.emoji} {info.name}
                      </span>
                      {w.wrongCount > 1 && (
                        <span className="tag-pill bg-coral-100 text-coral-500">错过 {w.wrongCount} 次</span>
                      )}
                    </div>

                    <p className="mb-3 font-cute text-lg text-ink">
                      {w.stem}
                      {w.subject === "english" && extractEnglish(w.stem) && (
                        <SpeakButton text={extractEnglish(w.stem)} size="sm" variant="ghost" className="ml-1 inline-flex align-middle" />
                      )}
                    </p>

                    {w.options && (
                      <div className="mb-3 space-y-1.5">
                        {w.options.map((opt, i) => (
                          <div
                            key={i}
                            className={cn(
                              "flex items-center gap-1 rounded-xl border-2 px-3 py-1.5 text-sm",
                              opt === w.answer ? "border-mint-300 bg-mint-50 text-mint-500" : "border-ink/10 bg-paper text-ink/70"
                            )}
                          >
                            <span className="flex-1">
                              <span className="font-bold mr-1">{String.fromCharCode(65 + i)}.</span> {opt}
                              {opt === w.answer && isRevealed && <Check size={14} className="ml-1 inline" />}
                            </span>
                            {w.subject === "english" && extractEnglish(opt) && (
                              <SpeakButton text={extractEnglish(opt)} size="sm" variant="ghost" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <AnimatePresence>
                      {isRevealed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="rounded-xl bg-mint-50 p-3 text-sm">
                            <p className="text-mint-500">
                              <span className="font-bold">正确答案:</span>{w.answer}
                              {w.subject === "english" && extractEnglish(w.answer) && (
                                <SpeakButton text={extractEnglish(w.answer)} size="sm" variant="ghost" className="ml-1 inline-flex align-middle" />
                              )}
                            </p>
                            <p className="mt-1 text-ink/70">
                              <span className="font-bold">解析:</span>{w.explanation}
                              {w.subject === "english" && extractEnglish(w.explanation) && (
                                <SpeakButton text={extractEnglish(w.explanation)} size="sm" variant="ghost" className="ml-1 inline-flex align-middle" />
                              )}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => toggleReveal(w.id)}
                        className="btn-pop bg-sky2-100 px-4 py-1.5 text-sm text-sky2-500"
                      >
                        <Eye size={15} className="mr-1 inline" /> {isRevealed ? "收起" : "看答案"}
                      </button>
                      <button
                        onClick={() => handleMastered(w.id)}
                        className="btn-pop bg-mint-300 px-4 py-1.5 text-sm text-ink"
                      >
                        <Check size={15} className="mr-1 inline" /> 已掌握
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="mt-6 text-center">
            <Link to="/review" className="btn-pop bg-paper px-6 py-2.5 text-ink">← 返回复习</Link>
          </div>
        </>
      )}
    </div>
  );
}
