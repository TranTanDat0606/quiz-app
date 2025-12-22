import type { IAction } from "../types";

const initialState = {
  category: "",
  difficulty: "",
  type: "",
  amount: 0,
};

export const questionReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case "UPDATE_FORM_QUESTION": {
      return {
        ...state,
        category: action.payload.category,
        difficulty: action.payload.difficulty,
        type: action.payload.type,
        amount: action.payload.amount,
      };
    }
    default:
      return state;
  }
};
