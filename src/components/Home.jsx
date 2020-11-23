import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div
        style={{
          paddingTop: "40px",
          margin: "50px auto",
          width: "600px",
          height: "500px",
          border: "1px solid orange",
          borderRadius: "6px",
        }}
      >
        <h1 style={{ textAlign: "center", color: "white" }}>
          Welcome to Task Manager Application
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "20px",
            paddingTop: "40px",
          }}
        >
          You can make your life schedule using this application
        </p>
        <p
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "20px",
            paddingTop: "40px",
          }}
        >
          Please{" "}
          <Link to="/signup" style={{ color: "orange" }}>
            create an account
          </Link>{" "}
          if you do not have otherwise{" "}
          <Link style={{ color: "orange" }} to="/login">
            login
          </Link>
        </p>
      </div>
    );
  }
}

export default Home;
