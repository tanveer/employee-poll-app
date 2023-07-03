import { LOGIN_USER } from "./loginActions";

const authUser = (state = null, { type, authUser }) => {
  switch (type) {
    case "LOGIN_USER":
      return authUser;
    default:
      return state;
  }
};

export default authUser;
