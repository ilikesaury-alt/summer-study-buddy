import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useStudyStore } from "@/store/useStudyStore";
import {
  RECITE_ITEMS,
  DICTATION_ITEMS,
  MATH_PREVIEW_ITEMS,
  ENGLISH_WORDS,
} from "@/data/previewData";
import PageHeader from "@/components/PageHeader";
import ProgressRing from "@/components/ProgressRing";
import { cn } from "@/lib/utils";
import type { PreviewModule } from "@/types";

const MODULES: {
  to: string;
  module: PreviewModule;
  emoji: string;
  title: string;
  desc: string;
  total: number;
  bg: string;
  tilt: string;
}[] = [
  { to: "/preview/chinese-recite", module: "chinese-recite", emoji: "📜", title: "语文必背闯关", desc: "古诗课文背诵打卡", total: RECITE_ITEMS.length, bg: "from-coral-200 to-coral-300", tilt: "tilt-l" },
  { to: "/preview/dictation", module: "dictation", emoji: "✍️", title: "默写练习", desc: "词语遮盖默写", total: DICTATION_ITEMS.length, bg: "from-sun-200 to-sun-300", tilt: "tilt-r" },
  { to: "/preview/math", module: "math", emoji: "🧮", title: "数学新知识", desc: "三年级新课预习", total: MATH_PREVIEW_ITEMS.length, bg: "from-sky2-200 to-sky2-300", tilt: "tilt-l" },
  { to: "/preview/english", module: "english", emoji: "🌈", title: "英语新词汇", desc: "图文记单词", total: ENGLISH_WORDS.length, bg: "from-mint-200 to-mint-300", tilt: "tilt-r" },
];

export default function Preview() {
  const progress = useStudyStore((s) => s.previewProgress);
  const totalItems = MODULES.reduce((a, m) => a + m.total, 0);
  // 计算已完成数
  const realDone = MODULES.reduce((a, m) => {
    const ids = getItemIds(m.module);
    const done = ids.filter((id) => progress[`${m.module}-${id}`]).length;
    return a + done;
  }, 0);
  const overall = totalItems > 0 ? realDone / totalItems : 0;

  return (
    <div>
      <PageHeader
        emoji="🌱"
        title="预习新知识"
        subtitle="三年级新课抢先学,开学当个小老师!"
        accent="bg-gradient-to-r from-mint-200 to-mint-100"
      />

      {/* 成长树 + 总进度 */}
      <section className="mb-6 overflow-hidden rounded-blob border-2 border-white bg-gradient-to-br from-mint-50 to-sky2-50 p-6 shadow-sticker">
        <div className="flex items-center gap-6">
          <GrowthTree progress={overall} />
          <div className="flex-1">
            <p className="font-cute text-2xl text-ink">预习成长树</p>
            <p className="text-sm text-ink/60">每完成一项,小树就长出一片新叶子~</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1">
                <div className="h-3 overflow-hidden rounded-full bg-white/70">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-mint-300 to-mint-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${overall * 100}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
              <span className="font-cute text-ink">{realDone}/{totalItems}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 四宫格预习入口 */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {MODULES.map((m, idx) => {
          const ids = getItemIds(m.module);
          const done = ids.filter((id) => progress[`${m.module}-${id}`]).length;
          const ratio = m.total > 0 ? done / m.total : 0;
          return (
            <motion.div
              key={m.module}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Link
                to={m.to}
                className={cn(
                  "group relative block overflow-hidden rounded-blob border-2 border-white bg-gradient-to-br p-6 shadow-sticker transition-all hover:-translate-y-1.5 hover:shadow-pop",
                  m.bg,
                  m.tilt
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-5xl transition-transform group-hover:scale-110">{m.emoji}</span>
                  <ProgressRing progress={ratio} size={52} stroke={6} barClassName="text-white" trackClassName="text-white/40">
                    <span className="font-cute text-[10px] text-white">{done}/{m.total}</span>
                  </ProgressRing>
                </div>
                <p className="mt-3 font-cute text-2xl text-white drop-shadow">{m.title}</p>
                <p className="text-xs text-white/80">{m.desc}</p>
                <span className="absolute -bottom-3 -right-2 text-7xl opacity-15">{m.emoji}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// 获取每个模块的题目 id 列表
function getItemIds(module: PreviewModule): string[] {
  switch (module) {
    case "chinese-recite":
      return RECITE_ITEMS.map((i) => i.id);
    case "dictation":
      return DICTATION_ITEMS.map((i) => i.id);
    case "math":
      return MATH_PREVIEW_ITEMS.map((i) => i.id);
    case "english":
      return ENGLISH_WORDS.map((i) => i.id);
  }
}

// 成长树 SVG
function GrowthTree({ progress }: { progress: number }) {
  // 叶子数量
  const leaves = 12;
  const visible = Math.round(progress * leaves);
  return (
    <div className="relative h-32 w-32 flex-shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full">
        {/* 树干 */}
        <path d="M60 115 L60 70 M60 90 Q45 80 40 65 M60 90 Q75 80 80 65 M60 75 Q50 65 48 55 M60 75 Q70 65 72 55" stroke="#8B5E34" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* 叶子 */}
        {Array.from({ length: leaves }).map((_, i) => {
          const angle = (i / leaves) * Math.PI * 2;
          const cx = 60 + Math.cos(angle) * 28;
          const cy = 55 + Math.sin(angle) * 22;
          const show = i < visible;
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r={7}
              fill={show ? "#9BE564" : "#E8E8E8"}
              initial={false}
              animate={{ scale: show ? 1 : 0.6, opacity: show ? 1 : 0.5 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          );
        })}
        {/* 果实 */}
        {progress >= 0.5 && (
          <motion.circle cx={50} cy={45} r={4} fill="#FF6B6B" initial={{ scale: 0 }} animate={{ scale: 1 }} />
        )}
        {progress >= 0.8 && (
          <motion.circle cx={72} cy={50} r={4} fill="#FF6B6B" initial={{ scale: 0 }} animate={{ scale: 1 }} />
        )}
        {progress >= 1 && (
          <motion.circle cx={60} cy={38} r={4} fill="#FFC93C" initial={{ scale: 0 }} animate={{ scale: 1 }} />
        )}
      </svg>
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-2xl">🌱</span>
    </div>
  );
}
