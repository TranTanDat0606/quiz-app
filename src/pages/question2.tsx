import React from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import he from "he";

import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import type { IDataSource, IStore } from "../types";
import { updateFinalScore } from "../redux/question/question.actions";
import Score from "../components/score";
import { DIFFICULTY_TIMES } from "../config";
import { formatTime } from "../utils/formatTIme";

const Question = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const question = useSelector((state: IStore) => state.question);

  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [options, setOptions] = React.useState<string[]>([]);
  const [dataSource, setDataSource] = React.useState<IDataSource[]>([]);
  const [progress, setProgress] = React.useState(0);
  const [time, setTime] = React.useState(DIFFICULTY_TIMES[question.difficulty || "easy"]);
  const totalScore = 100 / question.amount;

  //initial Question
  React.useEffect(() => {
    const { category, difficulty, type, amount } = question;
    if (!category || !difficulty || !type || !amount) return;

    async function fetchQuestion() {
      try {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
        );
        const data = await res.json();
        const results = data.results;
        const questions = results[questionIndex];
        const answers = [...questions.incorrect_answers];

        answers.splice(
          Math.floor(type === "multiple" ? Math.random() * 4 : Math.random() * 2),
          0,
          questions.correct_answer
        );

        setOptions(answers);
        setDataSource(results);
      } catch (e) {
        console.log("fail fetch question", e);
      }
    }
    fetchQuestion();
  }, [question]);

  // Next Question
  React.useEffect(() => {
    if (questionIndex > 0) {
      const questions = dataSource[questionIndex];
      const answers = [...questions.incorrect_answers];

      answers.splice(
        Math.floor(question.type === "multiple" ? Math.random() * 4 : Math.random() * 2),
        0,
        questions.correct_answer
      );
      setOptions(answers);
    }
  }, [dataSource]);

  // Count the time
  React.useEffect(() => {
    const intervalTimer = setInterval(() => {
      setTime((preState) => {
        if (preState > 0) {
          return preState - 1;
        } else {
          const randomAnswer = options[Math.floor(Math.random() * options.length)];
          handleAnswer(String(randomAnswer));
          return DIFFICULTY_TIMES[question.difficulty || "easy"];
        }
      });
    }, 1000);

    return () => clearInterval(intervalTimer);
  }, [options]);

  function handleAnswer(answer: string) {
    const question = dataSource[questionIndex];
    if (!question) return;

    if (answer === question.correct_answer) {
      dispatch(updateFinalScore());
      setProgress((preState) => preState + totalScore);
    }

    if (questionIndex + 1 === dataSource.length) {
      navigate("/final-score");
    } else {
      setTime(DIFFICULTY_TIMES[question.difficulty || "easy"]);
      setQuestionIndex((preState) => preState + 1);
    }
  }

  return (
    <Container maxWidth="xl" className="px-15!">
      <Box>
        {/* Main Top */}
        <div className="flex items-center pt-[30px]! justify-between">
          <div className="flex gap-[10px] items-center">
            <AccessTimeIcon sx={{ fontSize: 35, color: "red" }} />
            <Box>
              <Typography sx={{ fontWeight: 600 }}>Time Remaining</Typography>
              <Typography sx={{ color: "red" }}>{formatTime(time)}s</Typography>
            </Box>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex items-center  relative mt-10!">
          <div className="w-140 h-95 mr-13!">
            <Typography sx={{ marginBottom: "20px", fontWeight: 500 }}>
              Question {questionIndex + 1} of {question.amount}
            </Typography>

            {/* Title Question */}
            <Typography> {he.decode(dataSource[questionIndex]?.question ?? "")}</Typography>

            {/* Answer */}
            <Box
              sx={{
                paddingRight: 20,
                position: "absolute",
                bottom: 0,
              }}
            >
              <div className=" flex gap-5 flex-wrap">
                {options.map((option) => (
                  <Button
                    variant="outlined"
                    sx={{ width: 250, p: 1.2, borderRadius: 3, borderColor: "gray", color: "black" }}
                    onClick={() => handleAnswer(option)}
                  >
                    {he.decode(option)}
                  </Button>
                ))}
              </div>
            </Box>
          </div>

          {/* Progress update */}
          <div className="relative">
            <CircularProgress
              enableTrackSlot
              variant="determinate"
              value={progress}
              size={200}
              sx={{
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                },
                color: progress <= 25 ? "red" : progress <= 50 ? "orange" : "green",
              }}
            />
            <Score dataSource={dataSource} />
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default Question;
