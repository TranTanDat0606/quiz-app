import type { IForm } from "../types";

export const updateFormQuestion = ({ category, difficulty, type, amount }: IForm) => {
  return {
    type: "UPDATE_FORM_QUESTION",
    payload: {
      category,
      difficulty,
      type,
      amount,
    },
  };
};
