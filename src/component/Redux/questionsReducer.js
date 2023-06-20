import {
  GET_ALL_QUESTIONS,
  SAVE_ANSWER,
  SAVE_NEW_POLL_QUESTION,
} from "./constants";

const intislState = {
  questions: {},
};

const questions = (state = intislState, action) => {
  switch (action.type) {
    case GET_ALL_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      };
    case SAVE_NEW_POLL_QUESTION:
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.question.id]: action.question,
        },
      };
    default:
      return state;
  }
};

export default questions;
