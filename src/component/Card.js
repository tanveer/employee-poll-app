import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Card({ questions, users, qId}) {
  return (
    <div className="card mb-3 me-3" style={{ width: "18rem" }}>
      <img
        className="rounded-circle align-self-center mt-3"
        style={{ width: 75 }}
        src={users[questions[qId].author].avatarURL}
      />
      <h5 className="card-title align-self-center">
        {users[questions[qId].author].name}
      </h5>
      <div className="card-body align-self-center">
        <p className="card-text">{questions[qId].text}</p>
        <Link
          to={`/questions/${qId}`}
          className="btn btn-primary align-self-center"
        >
          Show
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = ({ users, questions, authedUser }, props) => {
  const { answers } = users[authedUser];
  const selectOptions = Object.values(answers);
  const completed = Object.keys(answers)
    .map((key) => questions[key])
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(({ id }) => id);

  const unanswered = Object.values(questions)
    .sort((a, b) => b.timestamp - a.timestamp)
    .filter(({ id }) => !completed.includes(id))
    .map(({ id }) => id);

  return {
    selectOptions,
    completed,
    unanswered,
    answers,
    authedUser,
    questions,
    users,
  };
};

export default connect(mapStateToProps)(Card);
