import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserDashboard from "./users/UserDashboard";
import Dashboard from "./users/Dashboard";
import MyLearning from "./users/MyLearning";
import AI from "./users/AI";
import MockTest from "./users/MockTest";
import Performance from "./users/Performance";
import Quizzes from "./quizzes/Quizzes";
import JoinQuiz from "./quizzes/JoinQuiz";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/dashboard" element={<UserDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="learning" element={<MyLearning />} />
          <Route path="ai-tutor" element={<AI />} />
          <Route path="mock-tests" element={<MockTest />} />
          <Route path="performance" element={<Performance />} />
        </Route>
        <Route path="/quizzes/:slug" element={<Quizzes />} />
        <Route path="/join/:quizNumber/:slug" element={<JoinQuiz />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
