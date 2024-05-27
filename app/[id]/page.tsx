"use client";
import Header from "@/src/components/Header";
import MainQuestions from "@/src/features/MainQuestions";
import { BrowserRouter as Router } from "react-router-dom";

const Questions = () => {
  return (
    <Router>
      <Header />
      <MainQuestions />
    </Router>
  );
};

export default Questions;
