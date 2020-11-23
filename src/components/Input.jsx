import React from "react";
const Input = ({ name, label, value, onChange, error, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && (
        <div className="alert alert-primary" style={{ width: "60%" }}>
          {error}
        </div>
      )}
    </div>
  );
};
export default Input;
