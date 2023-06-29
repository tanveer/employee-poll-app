import "./App.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import { Routes, Route } from "react-router-dom";
import NewPoll from "./component/NewPoll";
import PollQuestion from "./component/PollQuestion";
import Questions from "./component/Questions";
import Leaderboard from "./component/Leaderboard";
import Profile from "./component/Profile";

function App({ users, authedUser, handleInitialData }) {

  const getAllData = async () => {
    await handleInitialData();
  }
  useEffect(() => {
    getAllData();
    return (
      console.log('Done fetching intial data...')
    )
  }, []);


  return (
    <div className="container">
      { users && <Navbar />}
      <Routes>
        <Route path="/new_poll" element={authedUser && <NewPoll />} />
        <Route path="/" element={authedUser && <Home />} />
        <Route path="/questions/:id" element={authedUser && <PollQuestion />} />
        <Route path="user/questions" element={authedUser && <Questions />} />
        <Route path="leaderboard" element={authedUser && <Leaderboard />} />
        <Route path="/profile" element={authedUser && <Profile />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = ({ questions, users, authedUser }) => {
  return {
    questions,
    users,
    authedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInitialData: () => dispatch(handleInitialData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
