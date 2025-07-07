import React, { useEffect, useState } from "react";
import "./ProfileScreen.css";
import { ArrowLeft } from "react-bootstrap-icons";

const ProfileScreen = ({ onBack }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data[1])); // 2nd user = Ervin Howell
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <div className="profile-page container mt-3 ">
        <div className="mb-3 d-flex align-items-center back-link" onClick={onBack}>
          <ArrowLeft className="arrow-left me-2" />
          <span className="Welcome-msg fw-bold ">Welcome, {user.name}</span>
        </div>

        <div className="profile-card  shadow-sm  bg-white">
          <div className="user-details row">
            <div className="avatar-circle large col-6">
              {user.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
            </div>
            <div className="profile-user col-6">
              <h5 className="user-name fw-bold">{user.name}</h5>
              <p className="user-email">{user.email}</p>
            </div>
          </div>

          <div className="profile-elements row">
            <div className="col-6">
              <label className="form-label">User ID</label>
              <input className="form-control" value="12345687" disabled />
            </div>
            <div className="col-6">
              <label className="form-label">Name</label>
              <input className="form-control" value={user.name} disabled />
            </div>
            <div className="col-6">
              <label className="form-label">Email ID</label>
              <input className="form-control" value={user.email} disabled />
            </div>
            <div className="col-6">
              <label className="form-label">Address</label>
              <input className="form-control" value={user.address.street} disabled />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input className="form-control" value={user.phone} disabled />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
