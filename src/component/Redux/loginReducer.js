const intialState = {
  loginUser: null,
};

const loginUser = (state = intialState, { type, loginUser }) => {
  switch (type) {
    case "LOGIN_USER":
      return {
        ...state,
        loginUser,
      };
    default:
      return state;
  }
};

export default loginUser;
