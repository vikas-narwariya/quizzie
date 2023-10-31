import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import CreateQuiz from "./pages/CreateQuiz";
import LoginSignup from "./pages/LoginSignup";
import QuestionWise from "./pages/QuestionWise";
import PollWise from "./pages/PollWise";
import QuizScreen from "./components/QuizScreen";
import PollScreen from "./components/PollScreen";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/analytics/:quizId" element={<QuestionWise />} />
        <Route path="/poll-wise-analysis" element={<PollWise />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/" element={<LoginSignup />} />
        <Route path="/quiz/:id" element={<QuizScreen />} />
        <Route path="/poll" element={<PollScreen />} />
      </Routes>
    </div>
  );
}

export default App;
