import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface StarBurstProps {
  trigger: number; // 改变即触发
  x?: number; // 中心 x 百分比
  y?: number; // 中心 y 百分比
}

// 星星飞溅动画,trigger 数值变化时播放一次
export default function StarBurst({ trigger, x = 50, y = 50 }: StarBurstProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger <= 0) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, [trigger]);

  const stars = ["⭐", "✨", "🌟", "💫"];

  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const dist = 60 + (i % 3) * 20;
            return (
              <motion.span
                key={`${trigger}-${i}`}
                className="absolute text-2xl"
                style={{ left: `${x}%`, top: `${y}%` }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
                animate={{
                  x: Math.cos(angle) * dist,
                  y: Math.sin(angle) * dist,
                  opacity: 0,
                  scale: 1.3,
                  rotate: (i % 2 === 0 ? 1 : -1) * 180,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {stars[i % stars.length]}
              </motion.span>
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}
