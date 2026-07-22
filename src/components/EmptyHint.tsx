import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface EmptyHintProps {
  emoji: string;
  title: string;
  desc: string;
  to?: string;
  btnText?: string;
  className?: string;
}

// 空状态提示
export default function EmptyHint({ emoji, title, desc, to, btnText, className }: EmptyHintProps) {
  return (
    <div className={cn("rounded-blob border-2 border-dashed border-ink/15 bg-white/60 p-10 text-center", className)}>
      <div className="mb-3 text-6xl animate-float">{emoji}</div>
      <p className="font-cute text-xl text-ink">{title}</p>
      <p className="mt-1 text-sm text-ink/50">{desc}</p>
      {to && btnText && (
        <Link to={to} className="btn-pop mt-4 inline-block bg-sun-400 px-6 py-2 text-white">
          {btnText}
        </Link>
      )}
    </div>
  );
}
