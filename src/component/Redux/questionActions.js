import { GET_ALL_QUESTIONS, SAVE_NEW_POLL_QUESTION } from "./constants";

export const getAllQuestions = (questions) => {
  return {
    type: GET_ALL_QUESTIONS,
    questions,
  };
};

export const saveNewPollQuestion = (question) => {
  return {
    type: SAVE_NEW_POLL_QUESTION,
    question,
  };
};
