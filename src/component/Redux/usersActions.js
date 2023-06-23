import { GET_USERS, UPDATE_USER_ANSWER } from "./constants";

export const getAllUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

export const updateUserAnswer = (authedUser, qid, answer) => {
  return {
    type: UPDATE_USER_ANSWER,
    authedUser,
    qid,
    answer,
  };
};
