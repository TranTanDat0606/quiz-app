import React from "react";
import { useSelector } from "react-redux";
import type { IStore } from "../types";

const Question = () => {
  const question = useSelector((state: IStore) => state.question);

  React.useEffect(() => {
    const { category, difficulty, type, amount } = question;

    if (!category || !difficulty || !type || !amount) return;

    async function fetchQuestion() {
      try {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
        );
        const data = await res.json();
        console.log(data);
      } catch (e) {
        console.log("fail fetch question", e);
      }
    }

    fetchQuestion();
  }, [question]);

  return <div>Q</div>;
};

export default Question;
