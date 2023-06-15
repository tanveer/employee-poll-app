import { _getUsers } from "../_DATA";

export const getAllUsers = (users) => {
  return {
    type: "FETCH_USERS",
    payload: users,
  };
};
