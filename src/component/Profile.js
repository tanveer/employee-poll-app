import React from "react";
import { connect } from "react-redux";
import authUser from "../Redux/loginReducer";

const Profile = ({ user }) => {
  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={user.avatarURL}
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">Something about the user...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, authUser }) => {
  const user = users[authUser];

  return { user };
};
export default connect(mapStateToProps)(Profile);
