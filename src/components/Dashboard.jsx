import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.authUser);
  return (
    <>
      <div className="container">
        <div
          className="card text-center"
          style={{
            margin: "30px auto",
            width: "500px",
            height: "400px",
            border: "1px solid gray",
            borderRadius: "6px",
            padding: "20px",
          }}
        >
          <div className="card-body">
            <h5 className="card-title">Task Manager</h5>
            <h2 style={{ paddingTop: "20px", color: "#16448c" }}>
              Welcome {user.name}
            </h2>
            <p className="card-text">
              you are successfully logged in click logout button above to
              logout.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
