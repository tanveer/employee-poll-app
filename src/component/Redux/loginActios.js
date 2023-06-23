export const loginUser = (authUser) => {
  return {
    type: "LOGIN_USER",
    authUser,
  };
};
