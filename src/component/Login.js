import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "./loginActios";

import { _getUsers } from "../_DATA";

function Login({ users, dispatch, currentUser }) {
  const [id, setUserId] = useState("");
  const usersArr = Object.values(users);

  const handleLogin = () => {
    dispatch(loginUser(id));
  };

  const handleSelectUser = ({ target }) => {
    const id =
      target.value !== ""
        ? usersArr.filter(({ id }) => id === target.value)[0].id
        : "";
    setUserId(id);
    // dispatch(loginUser(id));
  };

  const handleLogout = () => {
    if (currentUser.loginUser !== null) {
      setUserId("");
      dispatch(loginUser(""));
    }
  };

  return (
    <div>
      <p className="h2">Login</p>
      <div>
        <select defaultValue={id} onChange={handleSelectUser}>
          <option value="" disabled>
            Select user
          </option>
          {usersArr &&
            usersArr.map((user) => (
              <option value={user.id}>{user.name}</option>
            ))}
        </select>
        {id !== "" && (
          <button
            onClick={
              currentUser.loginUser !== null ? handleLogout : handleLogin
            }
          >
            {currentUser.loginUser !== null ? "Logout" : "login"}
          </button>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    currentUser: state.loginUser,
  };
};

export default connect(mapStateToProps)(Login);
