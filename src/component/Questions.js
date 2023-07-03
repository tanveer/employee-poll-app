import React from "react";
import { connect } from "react-redux";
import Card from "./Card";

const Questions = ({ questions }) => {
  return (
    <div className="row">
      {questions.map((q) => (
        <Card qId={q} key={q} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }) => {
  const questions = users[authedUser].questions;
  return { questions };
};

export default connect(mapStateToProps)(Questions);
