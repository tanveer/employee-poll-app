import { Layout } from "antd";
import Login from "./Login";
import { connect } from "react-redux";
import { loginUser } from "./Redux/loginActios";
import { Router, Route, Link } from "react-router-dom";

function Navbar({ currentUser, users, dispatch }) {
  const handleLogout = () => {
    dispatch(loginUser(null));
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
      <div className="container-fluid">
        <img src="./logo192.png" style={{ width: 50 }} />
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/leaderboard"
                className={
                  currentUser.loginUser ? "nav-link" : "nav-link disabled"
                }
              >
                Leaderboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/new_poll"
                className={
                  currentUser.loginUser ? "nav-link" : "nav-link disabled"
                }
                preventScrollReset={true}
              >
                New Poll
              </Link>
            </li>
          </ul>
          {currentUser.loginUser === null && (
            <div>
              <Login />
            </div>
          )}
          {currentUser.loginUser && (
            <div className="d-inline-flex justify-content-end">
              <p className="display-8 me-3 align-self-end">
                {users[currentUser.loginUser].name}
              </p>

              <div className="dropdown">
                <img
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  src={users[currentUser.loginUser].avatarURL}
                  className="rounded-circle align-self-center"
                  style={{ width: 75 }}
                />

                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Questions
                    </a>
                  </li>
                  <li>
                    <button
                      className="btn btn-link dropdown-item"
                      onClick={() => dispatch(loginUser(null))}
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

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    currentUser: state.loginUser,
  };
};

export default connect(mapStateToProps)(Navbar);
