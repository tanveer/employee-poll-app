import {
  GET_ALL_QUESTIONS,
  UPDATE_QUESTION_ANSWER,
  SAVE_NEW_POLL_QUESTION,
} from "./constants";

const initialState = {
  questions: {},
};
const questions = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SAVE_NEW_POLL_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case UPDATE_QUESTION_ANSWER:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: [...state[qid][answer].votes, authedUser],
          },
        },
      };

    default:
      return state;
  }
};

export default questions;
