import {
  RECEIVE_USERS,
  UPDATE_USER_ANSWER,
  SAVE_NEW_QUESTION,
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      console.log("users reducers");
      return {
        ...state,
        ...action.users,
      };
    case UPDATE_USER_ANSWER:
      const { authedUser, id, answer } = action;
      console.log("Question: ", authedUser, id, answer);
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [id]: answer,
          },
        },
      };
    case SAVE_NEW_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.author]: {
          ...state[question.author],
          questions: state[question.author].questions.concat(question.id),
        },
      };
    default:
      return state;
  }
}
