import {
  GET_ALL_QUESTIONS,
  SAVE_NEW_POLL_QUESTION,
  UPDATE_QUESTION_ANSWER,
} from "./constants";

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

export const updateQuestionAnswer = (authedUser, qid, answer) => {
  return {
    type: UPDATE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
};
