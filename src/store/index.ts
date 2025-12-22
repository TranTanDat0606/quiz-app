import { combineReducers, createStore } from "redux";
import { questionReducer } from "../redux/question.reducer";

const rootReducer = combineReducers({
  question: questionReducer,
});

export const store = createStore(rootReducer);
