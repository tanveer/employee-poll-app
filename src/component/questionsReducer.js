const intislState = {
  questions: {},
};

const questionsReducer = (state = intislState, action) => {
  switch (action.type) {
    case "GET_ALL_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
      };
    default:
      return state;
  }
};

export default questionsReducer;
