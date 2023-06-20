import "./App.css";
import { useEffect } from "react";
import { _getQuestions, _getUsers } from "./_DATA";
import Login from "./component/Login";
import { connect } from "react-redux";
import { getAllUsers } from "./component/Redux/usersActions";
import { getAllQuestions } from "./component/Redux/questionActions";
import { Layout } from "antd";
import Navbar from "./component/Navbar";
import Card from "./component/Card";
import Home from "./component/Home";
import { Routes, Route } from "react-router-dom";
import NewPoll from "./component/NewPoll";

function App({ users, currentUser, questions, dispatch }) {
  const getQuestions = async () => {
    const questions = await _getQuestions();
    dispatch(getAllQuestions(questions));
  };

  const getUsers = async () => {
    const usersObj = await _getUsers();
    dispatch(getAllUsers(usersObj));
  };

  useEffect(() => {
    getUsers();
    getQuestions();
    console.log(questions);
  }, []);

  return (
    <div className="container">
      {users && <Navbar />}
      <Routes>
        <Route
          path="/new_poll"
          element={currentUser.loginUser && <NewPoll />}
        />
        <Route path="/" element={currentUser.loginUser && <Home />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = ({ questions, users, loginUser }) => {
  return {
    questions,
    users,
    currentUser: loginUser,
  };
};
export default connect(mapStateToProps)(App);
