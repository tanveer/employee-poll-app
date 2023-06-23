import React from "react";

export default function LeaderCard({ leader }) {
  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={leader.avatarURL}
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{leader.name}</h5>
            <p className="card-text">
              Asked:
              <span class="badge bg-primary rounded-pill ms-2">
                {Object.keys(leader.answers).length}
              </span>
            </p>
            <p className="card-text">
              Voted:
              <span class="badge bg-primary rounded-pill ms-2">
                {Object.keys(leader.questions).length}
              </span>
            </p>
            <p className="card-text">
              <small className="text-body-secondary">{leader.timestamp}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
