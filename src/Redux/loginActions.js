export const LOGIN_USER = "LOGIN_USER"

export const loginUser = (authedUser) => {
  return {
    type: LOGIN_USER,
    authedUser,
  };
};
