export interface ICategory {
  id: number;
  name: string;
}

export interface IForm {
  category: string;
  difficulty: "easy" | "medium" | "hard" | "";
  type: "multiple" | "boolean" | "";
  amount: number;
  score: number;
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IStore {
  question: IForm;
}

export interface IUserStore {
  users: IUser[];
}

export interface IDataSource {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
  difficulty: "easy" | "medium" | "hard" | "";
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  score: number;
}
