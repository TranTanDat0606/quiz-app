import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Question from "./pages/question";
import FinalScore from "./pages/final-score";
import Leaderboard from "./pages/leaderboard";
import Header from "./components/header";

function App() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-gradient-to-r from-[#7DBA8C] via-[#6FAFA3] to-[#2F6F7E]">
      <div className="w-[70vw] h-[96vh] py-5! px-15! rounded-2xl bg-white/70 inset-shadow-[0_4px_20px_rgba(255,255,255,0.5)] ">
        <Header />
        <div className="h-[85%] bg-white rounded-xl relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/question" element={<Question />} />
            <Route path="/final-score" element={<FinalScore />} />
            <Route path="/leader-board" element={<Leaderboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
