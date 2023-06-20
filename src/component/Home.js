import { React, useState } from "react";
import { connect } from "react-redux";
import Card from "./Card";

function Home({ unanswered, completed, currentUser, questions }) {
  const [showUncompleted, setUncompleted] = useState(false);

  const togglePolls = () => {
    setUncompleted(!showUncompleted);
  };
  return (
    <div className="container">
      <button
        type="button"
        class="btn btn-primary  mb-5"
        data-bs-toggle="button"
        aria-pressed={showUncompleted}
        onClick={togglePolls}
      >
        {showUncompleted ? "Unanswered Poll >" : "< Answered Poll"}
      </button>

      {currentUser && showUncompleted ? (
        <div className="row">
          <p className="card-text h5">Answered Polls</p>
          {completed.map((qId) => (
            <Card key={qId} className="col" qId={qId} />
          ))}
        </div>
      ) : (
        <div className="row">
          {unanswered.map((qId) => (
            <Card key={qId} className="col" qId={qId} />
          ))}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { questions } = state.questions;
  const { users } = state.users;
  const { loginUser } = state.loginUser;

  const { answers } = users[loginUser];
  const completed = Object.keys(answers)
    .map((key) => questions[key])
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(({ id }) => id);

  const unanswered = Object.values(questions)
    .sort((a, b) => b.timestamp - a.timestamp)
    .filter(({ id }) => !completed.includes(id))
    .map(({ id }) => id);

  return {
    completed,
    unanswered,
    currentUser: loginUser,
    questions,
  };
};

export default connect(mapStateToProps)(Home);
