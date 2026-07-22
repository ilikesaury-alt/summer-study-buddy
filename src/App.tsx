import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import SafeBoundary from "@/components/SafeBoundary";
import Checkin from "@/pages/Checkin";
import Review from "@/pages/Review";
import Quiz from "@/pages/Quiz";
import WrongBook from "@/pages/WrongBook";
import Preview from "@/pages/Preview";
import ChineseRecite from "@/pages/ChineseRecite";
import Dictation from "@/pages/Dictation";
import MathPreview from "@/pages/MathPreview";
import EnglishPreview from "@/pages/EnglishPreview";
import Growth from "@/pages/Growth";

// 路由变化时自动重置错误边界,让用户切到其他页时能正常显示
function RouteErrorBoundary({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <SafeBoundary key={location.pathname}>
      {children}
    </SafeBoundary>
  );
}

export default function App() {
  // 全局兜底:捕获任何未处理的异步错误,防止整页白屏崩溃
  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      // 只阻止崩溃,不掩盖真实错误
      if (e.message?.includes("speechSynthesis") || e.message?.includes("SpeechSynthesis")) {
        e.preventDefault();
      }
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      const reason = e.reason;
      if (reason?.message?.includes("speechSynthesis") || reason?.message?.includes("SpeechSynthesis")) {
        e.preventDefault();
      }
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return (
    <Router>
      <Layout>
        <RouteErrorBoundary>
          <Routes>
            <Route path="/" element={<Checkin />} />
            <Route path="/review" element={<Review />} />
            <Route path="/review/quiz/:subject" element={<Quiz />} />
            <Route path="/review/wrong" element={<WrongBook />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/preview/chinese-recite" element={<ChineseRecite />} />
            <Route path="/preview/dictation" element={<Dictation />} />
            <Route path="/preview/math" element={<MathPreview />} />
            <Route path="/preview/english" element={<EnglishPreview />} />
            <Route path="/growth" element={<Growth />} />
          </Routes>
        </RouteErrorBoundary>
      </Layout>
    </Router>
  );
}
