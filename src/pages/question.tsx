import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import he from "he";

import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import type { IDataSource, IStore } from "../types";
import { updateFinalScore } from "../redux/question/question.actions";
import { DIFFICULTY_TIMES } from "../config";
import { formatTime } from "../utils/formatTIme";

const Question = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const question = useSelector((state: IStore) => state.question);
  const score = useSelector((state: IStore) => state.question.score);

  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [dataSource, setDataSource] = React.useState<IDataSource[]>([]);
  const [options, setOptions] = React.useState<string[]>([]);
  const [progress, setProgress] = React.useState(0);
  const [time, setTime] = React.useState(DIFFICULTY_TIMES[question.difficulty || "easy"]);

  const totalScore = 100 / question.amount;

  const { category, difficulty, type, amount } = question;

  const isReady = category && difficulty && type && amount;

  //initial Question
  React.useEffect(() => {
    if (!isReady) return;

    let ignore = false;

    async function fetchQuestion() {
      try {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
        );
        const data = await res.json();

        if (!ignore) {
          setDataSource(data.results);
          setQuestionIndex(0);
          setProgress(0);
        }
      } catch (e) {
        console.log("fail fetch question", e);
      }
    }

    fetchQuestion();
    return () => {
      ignore = true;
    };
  }, [isReady]);

  // Next Question
  React.useEffect(() => {
    const currentQuestion = dataSource[questionIndex];
    if (!currentQuestion) return;

    const answers = [...currentQuestion.incorrect_answers];
    answers.splice(
      Math.floor(question.type === "multiple" ? Math.random() * 4 : Math.random() * 2),
      0,
      currentQuestion.correct_answer
    );

    setOptions(answers);
  }, [questionIndex, dataSource, question.type]);

  // Count the time
  React.useEffect(() => {
    if (!options.length) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) return prev - 1;

        const randomAnswer = options[Math.floor(Math.random() * options.length)];
        handleAnswer(String(randomAnswer));

        return DIFFICULTY_TIMES[question.difficulty || "easy"];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [options, questionIndex, dataSource]);

  function handleAnswer(answer: string) {
    const currentQuestion = dataSource[questionIndex];
    if (!currentQuestion) return;

    if (answer === currentQuestion.correct_answer) {
      dispatch(updateFinalScore());
      setProgress((prev) => prev + totalScore);
    }

    if (questionIndex + 1 === dataSource.length) {
      navigate("/final-score");
    } else {
      setTime(DIFFICULTY_TIMES[question.difficulty || "easy"]);
      setQuestionIndex((prev) => prev + 1);
    }
  }

  return (
    <Container maxWidth="xl" className="px-15!">
      <Box>
        {/* TOP BAR */}
        <div className="flex items-center pt-[30px]! justify-between">
          <div className="flex gap-[10px] items-center">
            <AccessTimeIcon sx={{ fontSize: 35, color: "red" }} />
            <Box>
              <Typography sx={{ fontWeight: 600 }}>Time Remaining</Typography>
              <Typography sx={{ color: "red" }}>{formatTime(time)}s</Typography>
            </Box>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex items-center relative mt-10!">
          <div className="w-140 h-95 mr-13!">
            <Typography sx={{ mb: 2, fontWeight: 500 }}>
              Question {questionIndex + 1} of {question.amount}
            </Typography>

            <Typography>{he.decode(dataSource[questionIndex]?.question ?? "")}</Typography>

            {/* ANSWERS */}
            <Box
              sx={{
                paddingRight: 20,
                position: "absolute",
                bottom: 0,
              }}
            >
              <div className="flex gap-5 flex-wrap">
                {options.map((option) => (
                  <Button
                    key={option}
                    variant="outlined"
                    sx={{
                      width: 250,
                      p: 1.2,
                      borderRadius: 3,
                      borderColor: "gray",
                      color: "black",
                    }}
                    onClick={() => handleAnswer(option)}
                  >
                    {he.decode(option)}
                  </Button>
                ))}
              </div>
            </Box>
          </div>

          {/* PROGRESS */}
          <div className="relative">
            <CircularProgress
              enableTrackSlot
              variant="determinate"
              value={progress}
              size={200}
              sx={{
                "& .MuiCircularProgress-circle": { strokeLinecap: "round" },
                color: progress <= 25 ? "red" : progress <= 50 ? "orange" : "green",
              }}
            />
            <Typography sx={{ position: "absolute", top: 68, left: 60, fontWeight: 500, fontSize: 45 }}>
              {score}/{dataSource.length}
            </Typography>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default Question;
