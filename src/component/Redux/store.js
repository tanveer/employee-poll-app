import { createStore, applyMiddleware, combineReducers } from "redux";
import authUser from "./loginReducer";
import users from "./usersReducer";
import questions from "./questionsReducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  users,
  authUser,
  questions,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
