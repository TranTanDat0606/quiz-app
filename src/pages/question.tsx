import React from "react";
import { useSelector } from "react-redux";
import type { IStore } from "../types";
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import he from "he";
import { useNavigate } from "react-router-dom";

interface IDataSource {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
}

const Question = () => {
  const navigate = useNavigate();
  const question = useSelector((state: IStore) => state.question);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [options, setOptions] = React.useState<string[]>([]);
  const [dataSource, setDataSource] = React.useState<IDataSource[]>([]);
  const [score, setScore] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
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
  }, [dataSource, questionIndex]);

  function handleAnswer(answer: string) {
    const question = dataSource[questionIndex];

    if (answer === question.correct_answer) {
      setScore((preState) => preState + 1);
      setProgress((preState) => preState + totalScore);
    }

    if (questionIndex + 1 === dataSource.length) {
      navigate("/final-score");
    } else {
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
              <Typography sx={{ color: "red" }}>00 : 30s</Typography>
            </Box>
          </div>
          <Button variant="contained" color="success" className="text-[#fff] font-black">
            Submit
          </Button>
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
                    {option}
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
            <Typography sx={{ position: "absolute", top: 68, left: 60, fontWeight: 500, fontSize: 45 }}>
              {score}/{question.amount}
            </Typography>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default Question;
