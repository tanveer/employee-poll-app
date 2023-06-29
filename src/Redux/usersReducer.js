import { GET_ALL_USERS, UPDATE_USER_ANSWER } from "../actions/users";

const users = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        ...action.users,
      };
    case UPDATE_USER_ANSWER:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          },
        },
      };
    default:
      return state;
  }
};

export default users;
