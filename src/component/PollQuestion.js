import { useState } from "react";
import { connect } from "react-redux";
import { _saveQuestionAnswer } from "../_DATA";
import { useLocation, useNavigate } from "react-router-dom";
import { updateQuestionAnswer } from "./Redux/questionActions";
import { updateUserAnswer } from "./Redux/usersActions";

const PollQuestion = ({
  completed,
  unanswered,
  questions,
  authUser,
  dispatch,
  updateQuestionAnswer,
  updateUserAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const location = useLocation();
  const path = location.pathname;
  const qId = path.substring(path.lastIndexOf("/") + 1);
  const navigate = useNavigate();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  function saveQuestionAnswer({ authUser, qid, answer }) {
    return (dispatch) => {
      return new Promise((resolve, reject) => {
        if (!authUser || !qid || !answer) {
          reject("Please provide authedUser, qid, and answer");
        }

        setTimeout(() => {
          // Update the necessary state here
          updateQuestionAnswer(authUser, qid, answer);
          updateUserAnswer(authUser, qid, answer);

          resolve(true);
        }, 1000);
      });
    };
  }
  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    console.log("Selected option: ", selectedOption);

    try {
      await saveQuestionAnswer({
        authUser,
        qid: qId,
        answer: selectedOption,
      })(dispatch, updateQuestionAnswer, updateUserAnswer);
    } catch (error) {
      console.error(error);
      // Handle error, such as displaying an error message
    }
    navigate("/");
  };

  return (
    <div className="row">
      <p className="display-6">Would you rather...</p>

      <form onSubmit={handleAnswerSubmit}>
        <div className="mb-3 col-md-8">
          <label>
            <input
              disabled={completed.includes(qId)}
              className="me-4"
              type="radio"
              name="option"
              value="optionOne"
              checked={selectedOption === "optionOne"}
              onChange={handleOptionChange}
            />
            {questions[qId].optionOne.text}
          </label>
        </div>
        <div className="mb-3 col-md-8">
          <label>
            <input
              disabled={completed.includes(qId)}
              className="me-4"
              type="radio"
              name="option"
              value="optionTwo"
              checked={selectedOption === "optionTwo"}
              onChange={handleOptionChange}
            />
            {questions[qId].optionTwo.text}
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-lg col-md-8"
          disabled={!selectedOption}
        >
          Submit Answer
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authUser }) => {
  const { answers } = users[authUser];
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
    authUser,
    questions,
  };
};

const mapDispatchToProps = {
  updateQuestionAnswer,
  updateUserAnswer,
};

export default connect(mapStateToProps, mapDispatchToProps)(PollQuestion);
