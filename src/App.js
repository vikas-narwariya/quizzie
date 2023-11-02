import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Navigate, Outlet, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import CreateQuiz from "./pages/CreateQuiz";
import LoginSignup from "./pages/LoginSignup";
import QuestionWise from "./pages/QuestionWise";
import QuizScreen from "./components/QuizScreen";
import { isAuthenticated } from "./utils/auth";

function PrivateRoute({ element, redirectTo }) {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("userToken");

  if (!isAuthenticated) {
    navigate(redirectTo || "/");
    return null;
  }

  return element;
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
            />
          }
        />
        <Route
          path="/analytics"
          element={<PrivateRoute element={<Analytics />} />}
        />
        <Route
          path="/analytics/:quizId"
          element={<PrivateRoute element={<QuestionWise />} />}
        />
        <Route
          path="/create-quiz"
          element={<PrivateRoute element={<CreateQuiz />} />}
        />
        <Route
          path="/analytics"
          element={<PrivateRoute element={<Analytics />} />}
        />
        <Route path="/quiz/:id" element={<QuizScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
