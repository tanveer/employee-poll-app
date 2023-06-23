import "./App.css";
import { useEffect } from "react";
import { _getQuestions, _getUsers } from "./_DATA";
import { connect } from "react-redux";
import { getAllUsers } from "./component/Redux/usersActions";
import { getAllQuestions } from "./component/Redux/questionActions";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import { Routes, Route } from "react-router-dom";
import NewPoll from "./component/NewPoll";
import PollQuestion from "./component/PollQuestion";
import Questions from "./component/Questions";
import Leaderboard from "./component/Leaderboard";
import Profile from "./component/Profile";

function App({ users, authUser, dispatch }) {
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
  }, []);

  return (
    <div className="container">
      {users && <Navbar />}
      <Routes>
        <Route path="/new_poll" element={authUser && <NewPoll />} />
        <Route path="/" element={authUser && <Home />} />
        <Route path="/questions/:id" element={authUser && <PollQuestion />} />
        <Route path="user/questions" element={authUser && <Questions />} />
        <Route path="leaderboard" element={authUser && <Leaderboard />} />
        <Route path="/profile" element={authUser && <Profile />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = ({ questions, users, authUser }) => {
  return {
    questions,
    users,
    authUser,
  };
};
export default connect(mapStateToProps)(App);
