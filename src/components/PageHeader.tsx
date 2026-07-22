import { cn } from "@/lib/utils";

interface PageHeaderProps {
  emoji: string;
  title: string;
  subtitle?: string;
  tilt?: "left" | "right" | "none";
  accent?: string; // 背景色 tailwind 类
}

// 页面标题横幅
export default function PageHeader({
  emoji,
  title,
  subtitle,
  tilt = "left",
  accent = "bg-gradient-to-r from-sun-200 to-coral-100",
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative mb-6 overflow-hidden rounded-blob border-2 border-white p-6 shadow-sticker",
        accent,
        tilt === "left" && "tilt-l",
        tilt === "right" && "tilt-r"
      )}
    >
      <div className="flex items-center gap-4">
        <span className="animate-float text-5xl drop-shadow-sm">{emoji}</span>
        <div>
          <h1 className="font-cute text-3xl text-ink drop-shadow-sm">{title}</h1>
          {subtitle && <p className="mt-1 text-sm font-medium text-ink/70">{subtitle}</p>}
        </div>
      </div>
      {/* 装饰圆点 */}
      <span className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/30" />
      <span className="absolute -bottom-6 right-12 h-10 w-10 rounded-full bg-white/20" />
    </div>
  );
}
