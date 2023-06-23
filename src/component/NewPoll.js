import { useState } from "react";
import { connect } from "react-redux";
import { _saveQuestion } from "../_DATA";
import { useNavigate } from "react-router-dom";
import { saveNewPollQuestion } from "./Redux/questionActions";

const NewPoll = ({ authUser, dispatch }) => {
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

    const question = {
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authUser,
    };

    try {
      const newQuestion = await _saveQuestion(question);
      console.log(newQuestion);
      dispatch(saveNewPollQuestion(newQuestion));
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
    <div className="row">
      <p className="display-6">Would you rather...</p>

      <form onSubmit={handleNewPoll}>
        <div className="mb-3 col-md-8">
          <label>Option One</label>
          <input
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
            type="text"
            className="form-control"
            id="optionTwo"
            value={optionTwo}
            onChange={handleOptionTwo}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg col-md-8">
          Create
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authUser }) => {
  return {
    authUser,
  };
};

export default connect(mapStateToProps)(NewPoll);
