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
