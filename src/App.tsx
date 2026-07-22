import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
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

export default function App() {
  return (
    <Router>
      <Layout>
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
      </Layout>
    </Router>
  );
}
