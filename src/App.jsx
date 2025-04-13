// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import TopicsPage from "./pages/TopicsPage";
import VideoPage from "./pages/VideoPage";

import QuizPage from "./pages/QuizPage";
import TaskPage from "./pages/TaskPage";
import AchievementsPage from "./pages/AchievementsPage";
import FeedbackPage from "./pages/FeedbackPage";

import GamesPage from "./pages/GamesPage";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/task/:id" element={<TaskPage />} />
         <Route path="/quiz/:id" element={<QuizPage />} />
         <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/games" element={<GamesPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
