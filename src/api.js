import { _getUsers, _getQuestions } from "./_DATA"

// export function getInitialData () {
//   return Promise.all([
//     _getUsers(),
//     _getQuestions(),
//   ]).then(([users, questions]) => ({
//     users,
//     questions,
//   }))
// }

//testing this code
export default function getInitialData() {
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



