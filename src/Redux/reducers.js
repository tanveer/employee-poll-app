import { combineReducers } from "redux";
import authUser from "./loginReducer";
import users from "./usersReducer";
import questions from "./questionsReducer";
export default combineReducers({
  authUser,
  users,
  questions
})
