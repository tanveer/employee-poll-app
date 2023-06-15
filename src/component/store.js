import { createStore, applyMiddleware, combineReducers } from "redux";
import loginUserRedcuer from "./loginReducer";
import usersReducer from "./usersReducer";
const rootReducer = combineReducers({
  users: usersReducer,
  loginUser: loginUserRedcuer,
});

const store = createStore(rootReducer);

export default store;
