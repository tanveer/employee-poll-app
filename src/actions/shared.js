import getInitialData from "../api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthedUser } from './authedUser'



export function handleInitialData() {
  return async (dispatch, getState) => {
    const {authedUser} = getState()
    console.log("Fetching initial data...");
    try {
      const {users, questions} = await getInitialData();
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(authedUser));
    } catch (error) {
      console.error("Error occurred while fetching initial data:", error.message);
    }
  };
}