import { connect } from "react-redux";
import LeaderCard from "./LeaderCard";

const Leaderboard = ({ leaders }) => {
  return (
    <ul>
      <p className="display-6">Leaderboard</p>
      {leaders.map((leader) => (
        <li key={leader.id} className="list-group-item">
          <LeaderCard leader={leader} />
        </li>
      ))}
    </ul>
  );
};
const mapStateToProps = ({ users }) => {
  return {
    leaders: Object.values(users).sort((a, b) => {
      const laAnswers = Object.keys(a.answers).length;
      const lbAnswers = Object.keys(b.answers).length;
      const laQuestions = Object.keys(a.questions).length;
      const lbQuestions = Object.keys(b.questions).length;

      if (lbAnswers !== laAnswers) {
        return lbAnswers - laAnswers; // Sort by number of answers
      } else {
        return lbQuestions - laQuestions; // If same number of answers, sort by number of questions
      }
    }),
  };
};

export default connect(mapStateToProps)(Leaderboard);
