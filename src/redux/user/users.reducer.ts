import type { IAction } from "../../types";

const initialState: [] = [];

export const usersReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case "FINAL_SCORE/ADD_USER": {
      return [...state, action.payload];
    }
    default:
      return state;
  }
};
