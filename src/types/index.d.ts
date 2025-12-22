export interface ICategory {
  id: number;
  name: string;
}

export interface IForm {
  category: string;
  difficulty: "easy" | "medium" | "hard" | "";
  type: "multiple" | "boolean" | "";
  amount: number;
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IStore {
  question: IForm;
}
