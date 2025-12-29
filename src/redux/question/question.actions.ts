import type { IForm } from "../../types";

export const updateFormQuestion = ({ category, difficulty, type, amount }: IForm) => {
  return {
    type: "QUESTION/UPDATE_FORM_QUESTION",
    payload: {
      category,
      difficulty,
      type,
      amount,
    },
  };
};

export const updateFinalScore = () => {
  return {
    type: "QUESTION/UPDATE_FINAL_SCORE",
  };
};

export const resetScore = () => {
  return {
    type: "HEADER/RESET_SCORE",
  };
};
