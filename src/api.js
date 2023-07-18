import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA";

export function getInitialData() {
  console.log("Fetching initial data...");
  return Promise.all([_getUsers(), _getQuestions()])
    .then(([users, questions]) => {
      console.log("Received initial data:", { users, questions });
      return { users, questions };
    })
    .catch((error) => {
      console.error("Error occurred while fetching initial data:", error);
      throw error;
    });
}

export async function saveNewQuestion(authedUser, optionOne, optionTwo) {
  const question = {
    author: authedUser,
    optionOneText: optionOne,
    optionTwoText: optionTwo,
  };

  try {
    const savedQuestion = await _saveQuestion(question);
    return savedQuestion;
  } catch (e) {
    console.log("Error when trying to save new question: ", e);
  }
}

export function answerPollQuestion(authedUser, id, answer) {
  _saveQuestionAnswer(authedUser, id, answer);
}
