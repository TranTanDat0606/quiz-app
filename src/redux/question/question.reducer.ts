import type { IAction } from "../../types";

const initialState = {
  category: "",
  difficulty: "",
  type: "",
  amount: 0,
  score: 0,
};

export const questionReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case "HEADER/RESET_SCORE": {
      return {
        ...state,
        score: 0,
      };
    }

    case "QUESTION/UPDATE_FORM_QUESTION": {
      return {
        ...state,
        category: action.payload.category,
        difficulty: action.payload.difficulty,
        type: action.payload.type,
        amount: action.payload.amount,
      };
    }

    case "QUESTION/UPDATE_FINAL_SCORE": {
      return {
        ...state,
        score: state.score + 1,
      };
    }

    default:
      return state;
  }
};
