"use client";
import Header from "@/src/components/Header";
import MainQuestions from "@/src/features/MainQuestions";
import { BrowserRouter as Router } from "react-router-dom";
import Radium, { StyleRoot } from "radium";

const Questions = () => {
  return (
    <Router>
      <StyleRoot>
        <Header />
        <MainQuestions />
      </StyleRoot>
    </Router>
  );
};

export default Questions;
