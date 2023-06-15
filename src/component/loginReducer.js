const intialState = {
  loginUser: null,
};

const loginUserRedcuer = (state = intialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        loginUser: action.payload,
      };
    default:
      return state;
  }
};

export default loginUserRedcuer;
