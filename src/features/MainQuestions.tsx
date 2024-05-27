"use client";
import Header from "@/src/components/Header";
import UploadPage from "@/src/features/UploadPage";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";
import Chips from "../components/Chips";
import ProgressBar from "../components/ProgressBar";
import { Box } from "theme-ui";

const fetch_questions = (id: string, setQA: any) => {
  axios
    .get(`https://pdftester-backend.onrender.com/fetch_questions?id=${id}`)
    .then((response) => {
      const fetchQuestions = response?.data.data;
      setQA(fetchQuestions);
    });
};

const MainQuestions = () => {
  const id = useLocation().pathname.split("/")[1];
  const [QA, setQA] = useState([]);
  const [accCount, setAccCount] = useState<number[]>([]);
  const [missCount, setMissCount] = useState<number[]>([]);
  const [nextInsertIndex, setNextInsertIndex] = useState<number[]>([]);
  const [questionQue, setQuestionQue] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDisplayAnswer, setIsDisplayAnswer] = useState(false);
  useEffect(() => {
    fetch_questions(id, setQA);
  }, []);

  useEffect(() => {
    if (QA) {
      setNextInsertIndex([...Array(QA.length)].map((x) => 8));
      setAccCount([...Array(QA.length)].map((x) => 0));
      setMissCount([...Array(QA.length)].map((x) => 0));
      setQuestionQue(
        Array.from({ length: QA.length + 1 }, (_, index) => index)
      );
    }
  }, [QA?.length]);

  const displayAnswer = () => {
    setIsDisplayAnswer(true);
  };

  const handleAcc = () => {
    const newAccCount = accCount.map((count, index) =>
      index == currentIndex ? count + 1 : count
    );
    setAccCount(newAccCount);

    const newNextInsertIndex = nextInsertIndex.map((data, index) =>
      index == currentIndex
        ? missCount[currentIndex] == 0
          ? QA.length - 1
          : Math.min(
              Math.ceil(
                data *
                  1.2 *
                  Math.min(
                    (newAccCount[currentIndex] + 3) /
                      (newAccCount[currentIndex] + missCount[currentIndex] + 1),
                    1
                  )
              ),
              QA.length - 1
            )
        : data
    );
    setNextInsertIndex(newNextInsertIndex);

    const newQuestionQue = updateQue(newNextInsertIndex);
    setQuestionQue(newQuestionQue);

    updateCurrentIndex(newQuestionQue);
    setIsDisplayAnswer(false);
  };

  const handleMiss = () => {
    const newMissCount = missCount.map((count, index) =>
      index == currentIndex ? count + 1 : count
    );
    setMissCount(newMissCount);

    const newNextInsertIndex = nextInsertIndex.map((data, index) =>
      index == currentIndex ? Math.ceil(data / 2.5) : data
    );
    setNextInsertIndex(newNextInsertIndex);

    const newQuestionQue: number[] = updateQue(newNextInsertIndex);
    setQuestionQue(newQuestionQue);

    updateCurrentIndex(newQuestionQue);
    setIsDisplayAnswer(false);
  };

  const updateQue = (newNextInsertIndex: any) => {
    const insertIndex = newNextInsertIndex[currentIndex];
    const newQuestionQue = questionQue.map((data, index) =>
      index < insertIndex
        ? questionQue[index + 1]
        : index == insertIndex
        ? currentIndex
        : questionQue[index]
    );
    return newQuestionQue;
  };
  const updateCurrentIndex = (newQuestionQue: any) => {
    setCurrentIndex(newQuestionQue[0]);
  };

  const progressBarAchievement = () => {
    let achievementCount = 0;
    for (let i = 0; i < QA.length; i++) {
      if (
        accCount[i] > 0 &&
        accCount[i] / (accCount[i] + missCount[i]) >= 0.75
      ) {
        achievementCount += 1;
      }
    }

    return Math.round((achievementCount / QA.length) * 100);
  };

  return (
    <div
      style={{
        margin: "auto",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <ProgressBar value={progressBarAchievement()} />
      <Chips
        accCount={accCount[currentIndex]}
        missCount={missCount[currentIndex]}
      />

      {QA && (
        <div>
          <Box
            sx={{
              fontSize: "20px",
              height: "25vh",
              marginTop: "8vh",
              "@media(min-width: 500px)": {
                fontSize: "30px",
              },
            }}
          >
            {QA[currentIndex]?.Q}
          </Box>
          {isDisplayAnswer ? (
            <>
              <Box
                sx={{
                  fontSize: "20px",
                  height: "20vh",
                  marginTop: "20px",
                  "@media(min-width: 500px)": {
                    fontSize: "30px",
                  },
                }}
              >
                {QA[currentIndex]?.A}
              </Box>
              <div style={{ display: "flex" }}>
                <Button
                  onClick={handleMiss}
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
        </div>
      )}
    </div>
  );
};

export default MainQuestions;
