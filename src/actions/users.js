export const RECEIVE_USERS = "RECEIVE_USERS";
export const UPDATE_USER_ANSWER = 'UPDATE_USER_ANSWER'

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function saveUserQuestionAnswer(authedUser, id, answer) {
  return {
    type: UPDATE_USER_ANSWER,
    authedUser,
    id,
    answer,
  }
}