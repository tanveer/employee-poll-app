import Login from "./Login";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../Redux/loginActions";
import { setAuthedUser } from "../actions/authedUser";

function Navbar({ authedUser, users, dispatch }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
      <div className="container-fluid">
        <img src="./logo192.png" style={{ width: 50 }} />
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Poll
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/leaderboard"
                className={authedUser ? "nav-link" : "nav-link disabled"}
              >
                Leaderboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/new_poll"
                className={authedUser ? "nav-link" : "nav-link disabled"}
                preventScrollReset={true}
              >
                New Poll
              </Link>
            </li>
          </ul>
          {authedUser === null && (
            <div>
              <Login />
            </div>
          )}
          {authedUser && (
            <div className="d-inline-flex justify-content-end">
              <p className="display-8 me-3 align-self-end">
                {users[authedUser].name}
              </p>

              <div className="dropdown">
                <img
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  src={users[authedUser].avatarURL}
                  className="rounded-circle align-self-center"
                  style={{ width: 75 }}
                />

                <ul className="dropdown-menu">
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="user/questions" className="dropdown-item">
                      Questions
                    </Link>
                  </li>
                  <li>
                    <button
                      className="btn btn-link dropdown-item"
                      onClick={() => dispatch(setAuthedUser(null))}
                      style={{ color: "blue" }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = ({ users, authedUser }) => {
  return {
    users,
    authedUser,
  };
};

export default connect(mapStateToProps)(Navbar);
