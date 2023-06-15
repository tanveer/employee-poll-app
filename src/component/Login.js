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
    setUserId("");
    dispatch(loginUser(null));
  };

  return (
    <div>
      <p className="h2">Login</p>
      <div>
        <select value={id} onChange={handleSelectUser}>
          <option value="" disabled>
            Select user
          </option>
          {usersArr &&
            usersArr.map((user) => (
              <option value={user.id}>{user.name}</option>
            ))}
        </select>
        {id !== "" && (
          <button onClick={currentUser.loginUser ? handleLogout : handleLogin}>
            {currentUser.loginUser ? "Logout" : "Login"}
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
