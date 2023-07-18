import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { handleUserAnswer } from "../actions/shared";

const PollQuestion = ({
  completed,
  questions,
  authedUser,
  handleUserAnswer,
  users,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const location = useLocation();
  const path = location.pathname;
  const qId = path.substring(path.lastIndexOf("/") + 1);
  const navigate = useNavigate();

  const { optionOne, optionTwo, author } = questions[qId];
  const optionOneText = optionOne.text;
  const optionTwoText = optionTwo.text;
  const optionOneVotesCount = optionOne.votes.length;
  const optionTwoVotesCount = optionTwo.votes.length;

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    try {
      handleUserAnswer(authedUser, qId, selectedOption);
    } catch (e) {
      console.log("Failed to save answer: ", e.message);
    }
    navigate("/");
  };

  const totalVotes = optionOneVotesCount + optionTwoVotesCount;
  const optionOnePercent = Math.round(100 * (optionOneVotesCount / totalVotes));
  const optionTwoPercent = Math.round(100 * (optionTwoVotesCount / totalVotes));

  return (
    <form onSubmit={handleAnswerSubmit} className="text-md-start">
      <div className="row justify-content-center text-md-start">
        <p className="fw-medium text-center">Poll by {author}</p>
        <img
          src={users[author].avatarURL}
          style={{ width: "10%", borderRadius: "100%" }}
        />
        <p className="fw-bold text-center fs-6 mt-2 mb-5">Would You Rather</p>

        <div className=" text-md-start text-center mb-4">
          <label
            className={
              selectedOption
                ? "text-capitalize text-start text-body-secondary"
                : "text-capitalize text-start"
            }
          >
            <input
              disabled={completed.includes(qId)}
              className="me-2"
              type="radio"
              name="option"
              value="optionOne"
              checked={selectedOption === "optionOne"}
              onChange={handleOptionChange}
            />
            {optionOneText}
            {optionOneVotesCount > 0 && (
              <Fragment>
                <span className="ms-2 badge rounded-pill bg-primary">
                  {optionOneVotesCount}{" "}
                  {optionOneVotesCount > 1 ? "votes" : "vote"}
                </span>
                <span
                  className={
                    optionOneVotesCount >= optionTwoVotesCount
                      ? "ms-2 badge rounded-pill bg-success"
                      : "ms-2 badge rounded-pill bg-danger"
                  }
                >
                  {optionOnePercent}%
                </span>
              </Fragment>
            )}
          </label>
          <br />
          <label
            className={
              selectedOption
                ? "text-capitalize text-start"
                : "text-capitalize text-start text-body-secondary fw-lighter"
            }
          >
            <input
              disabled={completed.includes(qId)}
              className="me-2 position-relative"
              type="radio"
              name="option"
              value="optionTwo"
              checked={selectedOption === "optionTwo"}
              // checked={users[authedUser].answers[qId] ? true : false}
              onChange={handleOptionChange}
            />
            {optionTwoText}
            {optionTwoVotesCount > 0 && (
              <Fragment>
                <span className="ms-2 badge rounded-pill bg-primary">
                  {optionTwoVotesCount}{" "}
                  {optionTwoVotesCount > 1 ? "votes" : "vote"}
                </span>

                <span
                  className={
                    optionTwoVotesCount >= optionOneVotesCount
                      ? "ms-2 badge rounded-pill bg-success"
                      : "ms-2 badge rounded-pill bg-danger"
                  }
                >
                  {optionTwoPercent}%
                </span>
              </Fragment>
            )}
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!selectedOption}
        >
          Submit Answer
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = ({ questions, users, authedUser }) => {
  const { answers } = users[authedUser];
  const completed = Object.keys(answers)
    .map((key) => questions[key])
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(({ id }) => id);

  const unanswered = Object.values(questions)
    .sort((a, b) => b.timestamp - a.timestamp)
    .filter(({ id }) => !completed.includes(id))
    .map(({ id }) => id);

  console.log("Total votes: ", questions[completed[0]].optionTwo.votes.length);
  return {
    completed,
    unanswered,
    authedUser,
    questions,
    users,
  };
};

const mapDispatchToProps = {
  handleUserAnswer,
};

export default connect(mapStateToProps, mapDispatchToProps)(PollQuestion);
