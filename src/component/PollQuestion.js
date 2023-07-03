import { useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { handleUserAnswer } from "../actions/shared";

const PollQuestion = ({
  completed,
  questions,
  authedUser,
  handleUserAnswer,
  users
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const location = useLocation();
  const path = location.pathname;
  const qId = path.substring(path.lastIndexOf("/") + 1);
  const navigate = useNavigate();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    try{
      handleUserAnswer(authedUser, qId, selectedOption);
    }
    catch(e) {
      console.log("Failed to save answer: ", e.message)
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleAnswerSubmit} className="text-md-start">

    <div className="row justify-content-center text-md-start">
      <p className="fw-medium text-center">Poll by {questions[qId].author}</p>
      <img src={users[questions[qId].author].avatarURL} style={{width: '10%', borderRadius: "100%"}} />
      <p className="fw-bold text-center fs-6 mt-2 mb-5">Would You Rather</p>
        
        <div className=" text-md-start text-center mb-4">
          <label className="text-capitalize fw-semibold text-start">
            <input
              disabled={completed.includes(qId)}
              className="me-2"
              type="radio"
              name="option"
              value="optionOne"
              checked={selectedOption === "optionOne"}
              onChange={handleOptionChange}
            />
            {questions[qId].optionOne.text}
          </label>
          <br />
          <label className="text-capitalize fw-semibold">
            <input
              disabled={completed.includes(qId)}
              className="me-2"
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

  console.log("questions:", questions);
  console.log("users:", users);
  console.log("authedUser:", users[authedUser]);
  const { answers } = users[authedUser];

  console.log("Answers:", users[authedUser].answers);

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
    users
  };
};

const mapDispatchToProps = {
  handleUserAnswer,
};

export default connect(mapStateToProps, mapDispatchToProps)(PollQuestion);
