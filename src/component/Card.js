import React from "react";
import { connect } from "react-redux";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const seconds = date.getSeconds();
  let amPm = hours >= 12 ? "PM" : "AM";
  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours % 12;
  hours = hours ? hours : 12;
  const timeStr = `${hours}:${minutes} ${amPm}`;
  return `${timeStr} | ${day}/${month}/${year}`;
};

function Card({ currentUser, questions, completed, answers, users, qId }) {
  return (
    <div className="card mb-3 me-3" style={{ width: "18rem" }}>
      <img
        className="rounded-circle align-self-center"
        style={{ width: 75 }}
        src={users[questions[qId].author].avatarURL}
      />
      <h5 className="card-title align-self-center">
        {users[questions[qId].author].name}
        {/* {formatDate(questions[qId].timestamp)} */}
      </h5>
      <div className="card-body align-self-center">
        <p class="card-text">{questions[qId].text}</p>
        <a href="#" className="btn btn-primary align-self-center">
          Show
        </a>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { questions } = state.questions;
  const { users } = state.users;
  const { loginUser } = state.loginUser;

  const { answers } = users[loginUser];
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
    currentUser: loginUser,
    questions,
    users,
  };
};

export default connect(mapStateToProps)(Card);
