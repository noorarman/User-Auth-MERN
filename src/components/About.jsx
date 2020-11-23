import React from "react";

const About = () => {
  return (
    <div style={{ display: "box" }} class="container">
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>About me</h1>
      <h5 style={{ color: "#c4cc35" }}>Noor Ul Amin</h5>
      <img
        src={"me.jpg"}
        style={{ width: "280px", height: "280px" }}
        alt="Noor Ul Amin"
      />
      <p style={{ color: "#c4cc35", paddingTop: "20px" }}>
        MERN Stack Developer.
      </p>
      <p style={{ color: "#c4cc35", paddingTop: "10px" }}>My Github link=></p>
    </div>
  );
};

export default About;
