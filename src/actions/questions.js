export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_NEW_QUESTION = "SAVE_NEW_QUESTION"
export const UPDATE_QUESTION_ANSWER = 'UPDATE_QUESTION_ANSWER'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function saveNewPollQuestion(question) {
  return {
    type: SAVE_NEW_QUESTION,
    question,
  }
}

export function saveQuestionAnswer(authedUser, id, answer) {
  console.log('Update answer here: ', authedUser, id, answer)
  return {
    type: UPDATE_QUESTION_ANSWER,
    authedUser,
    id,
    answer

  }
}