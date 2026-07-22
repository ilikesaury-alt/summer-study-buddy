import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStudyStore } from "@/store/useStudyStore";

const NAV = [
  { to: "/", label: "打卡", icon: Home, color: "text-coral-400", active: "bg-coral-100 text-coral-500" },
  { to: "/review", label: "复习", icon: BookOpen, color: "text-sky2-500", active: "bg-sky2-100 text-sky2-500" },
  { to: "/preview", label: "预习", icon: Sparkles, color: "text-mint-400", active: "bg-mint-100 text-mint-400" },
  { to: "/growth", label: "成长", icon: TrendingUp, color: "text-sun-500", active: "bg-sun-100 text-sun-600" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const stars = useStudyStore((s) => s.totalStars);

  return (
    <div className="flex min-h-screen flex-col">
      {/* 顶部星星栏 */}
      <header className="sticky top-0 z-30 border-b-2 border-white/60 bg-paper/80 backdrop-blur-md">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🎒</span>
            <span className="font-cute text-lg text-ink">暑假学习小管家</span>
          </Link>
          <div className="flex items-center gap-1 rounded-full bg-sun-100 px-3 py-1 shadow-sticker">
            <span className="text-lg">⭐</span>
            <span className="font-cute text-base text-sun-600">{stars}</span>
          </div>
        </div>
      </header>

      {/* 主体 */}
      <main className="container flex-1 py-6 pb-28">{children}</main>

      {/* 底部导航 */}
      <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-[480px] -translate-x-1/2 border-t-2 border-white/60 bg-paper/90 backdrop-blur-md">
        <div className="flex items-stretch justify-around py-2">
          {NAV.map((item) => {
            const active = location.pathname === item.to ||
              (item.to !== "/" && location.pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-1.5 transition-all",
                  active ? item.active : "text-ink/50 hover:bg-white/50"
                )}
              >
                <Icon size={22} strokeWidth={2.5} className={active ? "animate-pop" : ""} />
                <span className="font-cute text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
