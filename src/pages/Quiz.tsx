import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Clock, RotateCcw, Trophy, X } from "lucide-react";
import { useStudyStore } from "@/store/useStudyStore";
import { SUBJECT_INFO } from "@/data/badges";
import { generateQuiz, isCorrect } from "@/utils/quizEngine";
import { cn } from "@/lib/utils";
import type { Question, Subject } from "@/types";
import Confetti from "@/components/Confetti";
import SpeakButton from "@/components/SpeakButton";

const QUIZ_COUNT = 10;

// 提取文本中的英文片段用于发音(支持单词和句子)
function extractEnglish(text: string): string {
  if (!text) return "";
  // 匹配英文字母(含撇号)组成的片段,空格分隔的连续英文视为一个句子
  const matches = text.match(/[a-zA-Z][a-zA-Z' ]*[a-zA-Z]|[a-zA-Z]/g);
  return matches ? matches.join(" ").trim() : "";
}

export default function Quiz() {
  const { subject = "chinese" } = useParams<{ subject: Subject }>();
  const navigate = useNavigate();
  const recordQuiz = useStudyStore((s) => s.recordQuiz);
  const info = SUBJECT_INFO[subject];

  const questions = useMemo<Question[]>(() => generateQuiz(subject, QUIZ_COUNT), [subject]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [judged, setJudged] = useState<null | boolean>(null);
  const [startTime, setStartTime] = useState(() => Date.now());
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState<{ score: number; stars: number; duration: number } | null>(null);
  const [celebrate, setCelebrate] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const submittingRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 切换学科时重置所有答题状态
  useEffect(() => {
    setIdx(0);
    setAnswers([]);
    setCurrent("");
    setJudged(null);
    setStartTime(Date.now());
    setFinished(false);
    setResult(null);
    submittingRef.current = false;
  }, [subject]);

  // 计时器每秒刷新
  useEffect(() => {
    if (finished) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [finished]);

  const q = questions[idx];

  // 重置当前题状态
  useEffect(() => {
    setCurrent("");
    setJudged(null);
    if (q?.type === "fill") {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [idx, q?.type]);

  if (questions.length === 0) {
    return <div className="text-center text-ink/50">该学科暂无题目</div>;
  }

  const judge = () => {
    if (!current.trim() || judged !== null) return;
    const ok = isCorrect(q, current);
    setJudged(ok);
  };

  const next = useCallback(() => {
    // 防重入:避免双击导致重复入库
    if (submittingRef.current) return;
    if (idx + 1 >= questions.length) {
      submittingRef.current = true;
      const newAnswers = [...answers, current];
      setAnswers(newAnswers);
      const correct = newAnswers.filter((a, i) => isCorrect(questions[i], a)).length;
      const duration = Math.floor((Date.now() - startTime) / 1000);
      const rec = recordQuiz(subject, questions, newAnswers, duration);
      setResult({ score: rec.score, stars: rec.earnedStars, duration });
      setFinished(true);
      if (rec.score === rec.total) setCelebrate((c) => c + 1);
    } else {
      setAnswers((prev) => [...prev, current]);
      setIdx(idx + 1);
    }
  }, [answers, current, idx, questions, recordQuiz, startTime, subject]);

  const restart = () => {
    navigate(0); // 重新加载当前路由生成新题
  };

  // 成绩单
  if (finished && result) {
    const ratio = result.score / questions.length;
    const msg = ratio === 1 ? "满分!太厉害啦!" : ratio >= 0.8 ? "真棒!再接再厉!" : ratio >= 0.6 ? "不错哦,继续加油!" : "别灰心,多练几次就好!";
    return (
      <div className="relative">
        <Confetti trigger={celebrate} />
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mx-auto max-w-lg overflow-hidden rounded-blob border-2 border-white bg-gradient-to-br from-sun-100 via-white to-mint-100 p-8 text-center shadow-pop"
        >
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-sun-300 shadow-pop"
          >
            <Trophy className="text-white" size={40} />
          </motion.div>
          <h2 className="font-cute text-3xl text-ink">{msg}</h2>
          <div className="my-5 flex justify-center gap-6">
            <Stat label="答对" value={`${result.score}/${questions.length}`} color="text-mint-500" />
            <Stat label="获得星星" value={`+${result.stars}⭐`} color="text-sun-500" />
            <Stat label="用时" value={`${Math.floor(result.duration / 60)}′${result.duration % 60}″`} color="text-sky2-500" />
          </div>

          {/* 答题回顾 */}
          <div className="mb-5 space-y-2 text-left">
            {questions.map((qq, i) => {
              const ua = answers[i] || "(未答)";
              const ok = isCorrect(qq, ua);
              return (
                <div key={qq.id} className={cn("rounded-2xl border-2 p-3 text-sm", ok ? "border-mint-200 bg-mint-50" : "border-coral-100 bg-coral-50")}>
                  <div className="flex items-start gap-2">
                    <span className={cn("mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-white", ok ? "bg-mint-400" : "bg-coral-400")}>
                      {ok ? <Check size={12} strokeWidth={4} /> : <X size={12} strokeWidth={4} />}
                    </span>
                    <div className="flex-1">
                      <p className="text-ink">
                        {qq.stem}
                        {subject === "english" && extractEnglish(qq.stem) && (
                          <SpeakButton text={extractEnglish(qq.stem)} size="sm" variant="ghost" className="ml-1 inline-flex align-middle" />
                        )}
                      </p>
                      <p className="mt-1 text-xs">
                        你的答案:<span className={ok ? "text-mint-500" : "text-coral-400"}>{ua}</span>
                        {!ok && <span className="text-mint-500"> · 正确:{qq.answer}</span>}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-3">
            <button onClick={restart} className="btn-pop bg-sky2-400 px-6 py-2.5 text-white">
              <RotateCcw size={18} className="mr-1 inline" /> 再来一局
            </button>
            <button onClick={() => navigate("/review")} className="btn-pop bg-paper px-6 py-2.5 text-ink">
              返回选科
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 答题中
  return (
    <div className="mx-auto max-w-2xl">
      {/* 顶部进度 */}
      <div className="mb-4 flex items-center justify-between">
        <button onClick={() => navigate("/review")} className="text-ink/50 hover:text-ink">
          <X size={22} />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{info.emoji}</span>
          <span className="font-cute text-ink">{info.name}闯关</span>
        </div>
        <div className="flex items-center gap-1 text-ink/60">
          <Clock size={16} />
          <span className="font-cute text-sm tabular-nums">
            {Math.floor((now - startTime) / 60000)}:
            {String(Math.floor(((now - startTime) / 1000) % 60)).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* 进度条 */}
      <div className="mb-5 flex gap-1.5">
        {questions.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2.5 flex-1 rounded-full transition-all",
              i < idx ? "bg-mint-400" : i === idx ? "bg-sun-400" : "bg-ink/10"
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          className="rounded-blob border-2 border-white bg-white p-6 shadow-sticker"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="tag-pill bg-sky2-100 text-sky2-500">第 {idx + 1} 题 / 共 {questions.length} 题</span>
            <span className="tag-pill bg-sun-100 text-sun-600">
              {q.type === "choice" ? "选择题" : "填空题"}
            </span>
          </div>

          <div className="mb-5 flex items-start gap-2">
            <h2 className="flex-1 font-cute text-2xl leading-relaxed text-ink">{q.stem}</h2>
            {subject === "english" && extractEnglish(q.stem) && (
              <SpeakButton text={extractEnglish(q.stem)} size="md" variant="solid" />
            )}
          </div>

          {/* 选择题 */}
          {q.type === "choice" && q.options && (
            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const selected = current === opt;
                const isAns = opt === q.answer;
                let style = "border-ink/15 bg-paper hover:border-sun-300";
                if (judged !== null) {
                  if (isAns) style = "border-mint-400 bg-mint-50";
                  else if (selected) style = "border-coral-400 bg-coral-50";
                  else style = "border-ink/10 bg-paper opacity-60";
                } else if (selected) {
                  style = "border-sun-400 bg-sun-50";
                }
                return (
                  <div
                    key={i}
                    className={cn("flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all", style)}
                  >
                    <button
                      type="button"
                      disabled={judged !== null}
                      onClick={() => setCurrent(opt)}
                      className="flex flex-1 items-center gap-3 text-left"
                    >
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white font-cute text-ink shadow-soft">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="font-medium text-ink">{opt}</span>
                      {judged !== null && isAns && <Check className="ml-auto text-mint-500" size={20} strokeWidth={3} />}
                      {judged !== null && selected && !isAns && <X className="ml-auto text-coral-400" size={20} strokeWidth={3} />}
                    </button>
                    {subject === "english" && extractEnglish(opt) && (
                      <SpeakButton
                        text={extractEnglish(opt)}
                        size="sm"
                        variant="ghost"
                        className="flex-shrink-0"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* 填空题 */}
          {q.type === "fill" && (
            <div>
              <input
                ref={inputRef}
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && judge()}
                disabled={judged !== null}
                placeholder="在这里输入答案..."
                className={cn(
                  "w-full rounded-2xl border-2 px-4 py-3 font-cute text-xl text-ink outline-none transition-all",
                  judged === null
                    ? "border-sun-300 bg-sun-50 focus:border-sun-500"
                    : judged
                    ? "border-mint-400 bg-mint-50"
                    : "border-coral-400 bg-coral-50"
                )}
              />
              {judged === false && (
                <p className="mt-2 text-sm text-coral-400">正确答案:{q.answer}</p>
              )}
            </div>
          )}

          {/* 解析 */}
          {judged !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "mt-4 rounded-2xl border-2 p-3",
                judged ? "border-mint-200 bg-mint-50" : "border-coral-100 bg-coral-50"
              )}
            >
              <p className="text-sm text-ink/80">
                <span className="font-bold">{judged ? "✅ 答对啦!" : "💡 答错啦,"}</span> {q.explanation}
                {subject === "english" && extractEnglish(q.explanation) && (
                  <SpeakButton text={extractEnglish(q.explanation)} size="sm" variant="ghost" className="ml-1 inline-flex align-middle" />
                )}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* 底部按钮 */}
      <div className="mt-5 flex justify-end">
        {judged === null ? (
          <button
            onClick={judge}
            disabled={!current.trim()}
            className="btn-pop bg-sun-400 px-8 py-3 text-lg text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            确认答案
          </button>
        ) : (
          <button onClick={next} className="btn-pop bg-mint-400 px-8 py-3 text-lg text-white">
            {idx + 1 >= questions.length ? "查看成绩" : "下一题"}
            <ChevronRight size={20} className="ml-1 inline" />
          </button>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center">
      <p className={cn("font-cute text-2xl", color)}>{value}</p>
      <p className="text-xs text-ink/50">{label}</p>
    </div>
  );
}
