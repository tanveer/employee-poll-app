import { createStore, applyMiddleware, combineReducers } from "redux";
import loginUserRedcuer from "./loginReducer";
import usersReducer from "./usersReducer";
import questionsReducer from "./questionsReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  loginUser: loginUserRedcuer,
  questions: questionsReducer,
});

const store = createStore(rootReducer);

export default store;
