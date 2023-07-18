import {
  RECEIVE_QUESTIONS,
  SAVE_NEW_QUESTION,
  UPDATE_QUESTION_ANSWER,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SAVE_NEW_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case UPDATE_QUESTION_ANSWER:
      const { authedUser, id, answer } = action;
      return {
        ...state,
        [id]: {
          ...state[id],
          [answer]: {
            ...state[id][answer],
            votes: [...state[id][answer].votes, authedUser],
          },
        },
      };
    default:
      return state;
  }
}
