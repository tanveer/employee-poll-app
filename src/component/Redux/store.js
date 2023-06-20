import { createStore, applyMiddleware, combineReducers } from "redux";
import loginUser from "./loginReducer";
import users from "./usersReducer";
import questions from "./questionsReducer";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  users,
  loginUser,
  questions,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
);

export default store;
