import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

function Login({ users, dispatch, authedUser }) {
  const [id, setUserId] = useState("");
  const usersArr = Object.values(users);

  const handleLogin = () => {
    dispatch(setAuthedUser(id));
  };

  const handleSelectUser = ({ target }) => {
    const id =
      target.value !== ""
        ? usersArr.filter(({ id }) => id === target.value)[0].id
        : "";
    setUserId(id);
  };

  const handleLogout = () => {
    setUserId("");
    dispatch(setAuthedUser(null));
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
            onClick={authedUser ? handleLogout : handleLogin}
          >
            {authedUser ? "Logout" : "Login"}
          </button>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({ users, authedUser }) => {
  return {
    users,
    authedUser,
  };
};

export default connect(mapStateToProps)(Login);
