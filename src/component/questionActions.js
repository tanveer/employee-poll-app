const getAllQuestions = (questions) => {
  return {
    type: "GET_ALL_QUESTIONS",
    payload: questions,
  };
};

export default getAllQuestions;
