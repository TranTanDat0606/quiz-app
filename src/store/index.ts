import { combineReducers, createStore } from "redux";
import { questionReducer } from "../redux/question/question.reducer";
import { usersReducer } from "../redux/user/users.reducer";

const rootReducer = combineReducers({
  question: questionReducer,

  users: usersReducer,
});

export const store = createStore(rootReducer);

/*state = {
  question: {
    category: "",
    difficulty: "",
    type: "",
    amount: 0,
  },
  user: [{
    firstName: "",
    lastName: "",
    email: "",
    score: 0,
  }],
}*/
