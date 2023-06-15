import "./App.css";
import { useEffect } from "react";
import { _getQuestions, _getUsers } from "./_DATA";
import Login from "./component/Login";
import { connect } from "react-redux";
import { getAllUsers } from "./component/usersActions";
import getAllQuestions from "./component/questionActions";

function App({ users, currentUser, questions, dispatch }) {
  const getQuestions = async () => {
    const questions = await _getQuestions();
    dispatch(getAllQuestions(questions));
  };

  useEffect(() => {
    const getUsers = async () => {
      const users = await _getUsers();
      dispatch(getAllUsers(users));
    };
    getUsers();
    getQuestions();
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

      {currentUser.loginUser && questions && (
        <ul>
          {questions.map(
            (q) => q.optionTwo.votes.length && <li>{q.optionOne.text}</li>
          )}
        </ul>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    currentUser: state.loginUser,
    questions: Object.values(state.questions.questions),
  };
};
export default connect(mapStateToProps)(App);
