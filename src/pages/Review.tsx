import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, BookOpen } from "lucide-react";
import { useStudyStore } from "@/store/useStudyStore";
import { SUBJECT_INFO } from "@/data/badges";
import { getQuestionsBySubject } from "@/data/reviewQuestions";
import PageHeader from "@/components/PageHeader";
import ProgressRing from "@/components/ProgressRing";
import type { Subject } from "@/types";

const SUBJECTS: Subject[] = ["chinese", "math", "english"];

export default function Review() {
  const quizRecords = useStudyStore((s) => s.quizRecords);
  const wrongCount = useStudyStore((s) => s.wrongQuestions.length);

  const stats = SUBJECTS.map((subject) => {
    const recs = quizRecords.filter((r) => r.subject === subject);
    const answered = recs.reduce((a, r) => a + r.total, 0);
    const correct = recs.reduce((a, r) => a + r.score, 0);
    const accuracy = answered > 0 ? correct / answered : 0;
    return { subject, answered, accuracy, pool: getQuestionsBySubject(subject).length };
  });

  return (
    <div>
      <PageHeader
        emoji="📖"
        title="复习出题"
        subtitle="二年级知识大闯关,看看你掌握了多少!"
        accent="bg-gradient-to-r from-sky2-200 to-sky2-100"
      />

      {/* 错题本入口 */}
      <Link
        to="/review/wrong"
        className="mb-6 flex items-center justify-between rounded-blob border-2 border-white bg-white p-4 shadow-sticker transition-all hover:-translate-y-0.5 hover:shadow-pop"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-100">
            <AlertCircle className="text-coral-400" size={24} />
          </span>
          <div>
            <p className="font-cute text-lg text-ink">我的错题本</p>
            <p className="text-xs text-ink/50">把错题消灭光,进步最快!</p>
          </div>
        </div>
        {wrongCount > 0 ? (
          <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-coral-400 px-2 font-cute text-white">
            {wrongCount}
          </span>
        ) : (
          <span className="rounded-full bg-mint-100 px-3 py-1 text-xs font-bold text-mint-500">已清空</span>
        )}
      </Link>

      {/* 学科选择 */}
      <h2 className="mb-3 font-cute text-2xl text-ink">选择学科开始闯关</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {stats.map((s, idx) => {
          const info = SUBJECT_INFO[s.subject];
          const tilt = idx % 2 === 0 ? "tilt-l" : "tilt-r";
          return (
            <motion.div
              key={s.subject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                to={`/review/quiz/${s.subject}`}
                className={`group block overflow-hidden rounded-blob border-2 border-white bg-gradient-to-br ${info.grad} p-6 shadow-sticker transition-all hover:-translate-y-1.5 hover:shadow-pop ${tilt}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-5xl transition-transform group-hover:scale-110">{info.emoji}</span>
                  <ProgressRing progress={s.accuracy} size={56} stroke={6} barClassName="text-white" trackClassName="text-white/40">
                    <span className="font-cute text-xs text-white">
                      {s.answered > 0 ? `${Math.round(s.accuracy * 100)}%` : "新"}
                    </span>
                  </ProgressRing>
                </div>
                <p className="mt-3 font-cute text-2xl text-white drop-shadow">{info.name}闯关</p>
                <p className="text-xs text-white/80">题库 {s.pool} 题 · 已答 {s.answered} 题</p>
                <div className="mt-4 flex items-center gap-1 rounded-full bg-white/30 px-3 py-1.5 font-cute text-white backdrop-blur-sm">
                  <BookOpen size={16} /> 开始闯关 →
                </div>
                <span className="absolute -bottom-4 -right-2 text-7xl opacity-15">{info.emoji}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* 历史成绩 */}
      {quizRecords.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-cute text-2xl text-ink">📊 最近闯关记录</h2>
          <div className="space-y-2">
            {[...quizRecords].reverse().slice(0, 6).map((r) => {
              const info = SUBJECT_INFO[r.subject];
              const ratio = r.score / r.total;
              return (
                <div key={r.id} className="flex items-center gap-3 rounded-2xl border-2 border-white bg-white p-3 shadow-soft">
                  <span className="text-2xl">{info.emoji}</span>
                  <div className="flex-1">
                    <p className="font-cute text-ink">{info.name}闯关</p>
                    <p className="text-xs text-ink/50">{r.date} · 用时 {Math.floor(r.durationSec / 60)}′{r.durationSec % 60}″</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-cute text-lg ${ratio === 1 ? "text-mint-500" : ratio >= 0.6 ? "text-sun-500" : "text-coral-400"}`}>
                      {r.score}/{r.total}
                    </p>
                    <p className="text-xs text-sun-500">+{r.earnedStars}⭐</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
