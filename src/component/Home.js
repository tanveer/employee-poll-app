import { React, useState } from "react";
import { connect } from "react-redux";
import Card from "./Card";

function Home({ unanswered, completed, authedUser, questions }) {
  const [showUncompleted, setUncompleted] = useState(false);

  const togglePolls = () => {
    setUncompleted(!showUncompleted);
  };
  return (
    <div className="container">
      <button
        type="button"
        className="btn btn-primary  mb-5"
        data-bs-toggle="button"
        aria-pressed={showUncompleted}
        onClick={togglePolls}
      >
        {showUncompleted ? "Unanswered Poll >" : "< Answered Poll"}
      </button>

      {authedUser && showUncompleted ? (
        <div className="row">
          <p className="card-text h5">Answered Polls</p>
          {completed.map((qId) => (
            <Card key={qId} className="col" qId={qId} />
          ))}
        </div>
      ) : (
        <div className="row">
          <p className="card-text h5">Unanswered Polls</p>

          {unanswered.map((qId) => (
            <Card key={qId} className="col" qId={qId} />
          ))}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ questions, users, authedUser }) => {
  const { answers } = users[authedUser];
  console.log("Answered: ", answers);
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
    authedUser,
    questions,
  };
};

export default connect(mapStateToProps)(Home);
