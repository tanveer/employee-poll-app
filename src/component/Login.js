import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "./Redux/loginActios";

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
    console.log(id);
    // dispatch(loginUser(id));
  };

  const handleLogout = () => {
    setUserId("");
    dispatch(loginUser(null));
  };

  return (
    <div>
      <div className="d-flex">
        <select
          onChange={handleSelectUser}
          className="form-select me-2"
          aria-label={id}
        >
          <option key={id} value="">
            Select a user
          </option>
          {usersArr &&
            usersArr.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
        </select>
        {id !== "" && (
          <button
            className="btn btn-outline-success me-3"
            onClick={currentUser.loginUser ? handleLogout : handleLogin}
          >
            {currentUser.loginUser ? "Logout" : "Login"}
          </button>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({ users, loginUser }) => {
  return {
    users: users.users,
    currentUser: loginUser,
  };
};

export default connect(mapStateToProps)(Login);
