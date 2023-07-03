import {getInitialData, saveNewQuestion, answerPollQuestion} from "../api";
import { receiveUsers, saveUserQuestionAnswer } from "./users";
import { receiveQuestions, saveNewPollQuestion, saveQuestionAnswer} from "./questions";
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

export function handleSaveNewPollQuestion(optionOne, optionTwo) {
  return async (dispatch, getState) => {
    const {authedUser} = getState()
    try {
      const question = await saveNewQuestion(authedUser, optionOne, optionTwo)
      dispatch(saveNewPollQuestion(question))
    }
    catch(error) {
      console.log('Failed saving new poll question: ', error.message)
    }
  }
}

export function handleUserAnswer(authedUser, id, answer) {
  return async (dispatch) => {
    try {
      await answerPollQuestion(authedUser, id, answer);
      await dispatch(saveQuestionAnswer(authedUser, id, answer));
      await dispatch(saveUserQuestionAnswer(authedUser, id, answer));
    } catch (e) {
      console.log('Failed to update user\'s answer:', e.message);
    }
  };
}
