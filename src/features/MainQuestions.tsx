"use client";
import Header from "@/src/components/Header";
import UploadPage from "@/src/features/UploadPage";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";
import Radium, { StyleRoot } from "radium";

const fetch_questions = (id: string, setQA) => {
  axios
    .get(`http://localhost:8001/fetch_questions?id=${id}`)
    .then((response) => {
      const fetchQuestions = response?.data.data;
      setQA(fetchQuestions);
    });
};

const MainQuestions = () => {
  const id = useLocation().pathname.split("/")[1];
  const [QA, setQA] = useState([]);
  const [accCount, setAccCount] = useState([]);
  const [missCount, setMissCount] = useState([]);
  const [nextInsertIndex, setNextInsertIndex] = useState([]);
  const [questionQue, setQuestionQue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDisplayAnswer, setIsDisplayAnswer] = useState(false);
  useEffect(() => {
    fetch_questions(id, setQA);
  }, []);

  useEffect(() => {
    if (QA) {
      console.log(QA.length);
      setNextInsertIndex([...Array(QA.length)].map((x) => 16));
      setAccCount([...Array(QA.length)].map((x) => 0));
      setMissCount([...Array(QA.length)].map((x) => 0));
      setQuestionQue([...Array(QA.length).keys()]);
    }
  }, [QA?.length]);

  const displayAnswer = () => {
    setIsDisplayAnswer(true);
  };

  const handleAcc = () => {
    setAccCount(
      accCount.map((count, index) =>
        index == currentIndex ? count + 1 : count
      )
    );
    setCurrentIndex((currentIndex) => {
      return currentIndex + 1;
    });
  };

  return (
    <div
      style={{
        margin: "auto",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {QA && (
        <StyleRoot>
          <div
            style={{
              fontSize: "20px",
              height: "25vh",
              marginTop: "10vh",
              "@media(min-width: 500px)": {
                fontSize: "30px",
              },
            }}
          >
            {QA[currentIndex]?.Q}
          </div>
          {isDisplayAnswer ? (
            <>
              <div
                style={{
                  fontSize: "20px",
                  height: "25vh",
                  marginTop: "50px",
                  "@media(min-width: 500px)": {
                    fontSize: "30px",
                  },
                }}
              >
                {QA[currentIndex]?.A}
              </div>
              <div style={{ display: "flex" }}>
                <Button
                  sx={{
                    color: "white",
                    margin: "auto",
                    width: "100px",
                    fontSize: "18px",
                    marginTop: "2vh",
                    backgroundColor: "#743333",
                    ":hover": { backgroundColor: "#641111" },
                    "@media(min-width: 500px)": {
                      fontSize: "25px",
                      width: "200px",
                      marginRight: "10px",
                    },
                  }}
                >
                  不正解
                </Button>
                <Button
                  onClick={handleAcc}
                  sx={{
                    color: "white",
                    margin: "auto",
                    width: "100px",
                    fontSize: "18px",
                    marginTop: "2vh",
                    backgroundColor: "#F43333",
                    ":hover": { backgroundColor: "#F41111" },
                    "@media(min-width: 500px)": {
                      fontSize: "25px",
                      width: "200px",
                      marginLeft: "10px",
                    },
                  }}
                >
                  正解
                </Button>
              </div>
            </>
          ) : (
            <Button
              onClick={displayAnswer}
              sx={{
                color: "white",
                width: "150px",
                height: "50px",
                margin: "auto",
                fontSize: "18px",
                marginTop: "2vh",
                backgroundColor: "#F43333",
                ":hover": { backgroundColor: "#F41111" },
                "@media(min-width: 500px)": {
                  fontSize: "25px",
                  width: "250px",
                  height: "60px",
                },
              }}
            >
              答えを見る
            </Button>
          )}
        </StyleRoot>
      )}
    </div>
  );
};

export default MainQuestions;
