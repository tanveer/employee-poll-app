const intialState = {
  users: {},
};

const users = (state = intialState, { type, users }) => {
  switch (type) {
    case "FETCH_USERS":
      return {
        ...state,
        users,
      };
    default:
      return state;
  }
};

export default users;
