import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ConfettiProps {
  trigger: number;
}

const COLORS = ["#FFC93C", "#5BC0EB", "#9BE564", "#FF6B6B", "#E8D5B7"];
const SHAPES = ["●", "★", "◆", "▲", "♥"];

// 撒花庆祝动画
export default function Confetti({ trigger }: ConfettiProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger <= 0) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 2600);
    return () => clearTimeout(t);
  }, [trigger]);

  const pieces = Array.from({ length: 36 });

  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
          {pieces.map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 0.4;
            const duration = 2 + Math.random() * 0.8;
            const color = COLORS[i % COLORS.length];
            const shape = SHAPES[i % SHAPES.length];
            return (
              <motion.span
                key={`${trigger}-${i}`}
                className="absolute text-2xl"
                style={{ left: `${left}%`, top: "-5%", color }}
                initial={{ y: -20, opacity: 1, rotate: 0 }}
                animate={{ y: "110vh", opacity: 0, rotate: 720 }}
                transition={{ duration, delay, ease: "easeIn" }}
              >
                {shape}
              </motion.span>
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}
