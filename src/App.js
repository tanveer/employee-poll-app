import logo from "./logo.svg";
import "./App.css";
import { useState, useEff } from "react";
import { useEffect } from "react";
import { _getUsers } from "./_DATA";
import Login from "./component/Login";
import { connect } from "react-redux";
import { getAllUsers } from "./component/usersActions";

function App({ users, currentUser, dispatch }) {
  useEffect(() => {
    const getUsers = async () => {
      const users = await _getUsers();
      dispatch(getAllUsers(users));
    };
    getUsers();
  }, {});

  const usersArr = Object.values(users);

  return (
    <div className="App">
      {users && <Login />}
      {users &&
        usersArr.map(
          (user) =>
            user.id === currentUser.loginUser && (
              <img
                style={{ width: 150, borderRadius: 150 }}
                src={users[currentUser.loginUser].avatarURL}
              />
            )
        )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    currentUser: state.loginUser,
  };
};
export default connect(mapStateToProps)(App);
