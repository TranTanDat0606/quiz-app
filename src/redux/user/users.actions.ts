import type { IUser } from "../../types";

export const addUser = ({ firstName, lastName, email, score }: IUser) => {
  return {
    type: "FINAL_SCORE/ADD_USER",
    payload: { firstName, lastName, email, score },
  };
};
