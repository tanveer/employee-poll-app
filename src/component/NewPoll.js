import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleSaveNewPollQuestion } from "../actions/shared";

const NewPoll = ({ authedUser, dispatch }) => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const navigate = useNavigate();

  const handleOptionOne = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setOptionOne(value);
  };

  const handleOptionTwo = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setOptionTwo(value);
  };

  const handleNewPoll = async (e) => {
    e.preventDefault();
    try {
      dispatch(handleSaveNewPollQuestion(authedUser, optionOne, optionTwo));
      // send user back to home page
    } catch (error) {
      console.error(error);
    }
    navigate("/");
    // Reset input fields
    setOptionOne("");
    setOptionTwo("");
  };

  return (
    <div className="row" data-testid="new-poll-component">
      <p className="display-6">Would you rather...</p>

      <form onSubmit={handleNewPoll}>
        <div className="mb-3 col-md-8">
          <label>Option One</label>
          <input
            role="textbox"
            aria-label="Option One"
            type="text"
            className="form-control"
            id="optionOne"
            value={optionOne}
            onChange={handleOptionOne}
          />
        </div>
        <div className="mb-3 col-md-8">
          <label>Option Two</label>
          <input
            role="textbox"
            aria-label="Option Two"
            type="text"
            className="form-control"
            id="optionTwo"
            value={optionTwo}
            onChange={handleOptionTwo}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg col-md-8">
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(NewPoll);
