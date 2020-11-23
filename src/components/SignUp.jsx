import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import joi from "joi-browser";
import Input from "./Input";
import "./SignUp.css";
import { connect } from "react-redux";
import { doSignUp } from "../redux/users/actions";

class SignUp extends Component {
  state = {
    account: { name: "", email: "", password: "" },
    error: {},
    isUserAlreadyExist: "",
  };
  schema = {
    name: joi.string().required().label("name"),
    email: joi.string().email({ minDomainAtoms: 2 }).label("email"),
    password: joi.string().alphanum().min(6).max(50).label("password"),
  };
  validateproperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  validate = () => {
    const { error } = joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    for (let item of error.details) error[item.path[0]] = item.message;
    return error;
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const error = this.validate();
    this.setState({ error: error || {} });
    if (error) return;
    this.props.doSignUp(
      this.state.account.name,
      this.state.account.email,
      this.state.account.password
    );
  };
  componentDidUpdate() {
    if (this.props.user) {
      this.props.history.push("/dashboard");
    }
  }
  handleChange = ({ currentTarget: input }) => {
    const error = { ...this.state.error };
    const errorMessage = this.validateproperty(input);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, error });
  };
  render() {
    const { account } = this.state;
    const { error, loading } = this.props;
    return (
      <div className="container">
        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div
          style={{
            margin: "30px auto",
            width: "400px",
            padding: "30px 30px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Sign Up</h1>
          <form onSubmit={this.handleSubmit} style={{ paddingTop: "20px" }}>
            <Input
              type="text"
              name="name"
              label="Name"
              value={account.name}
              onChange={this.handleChange}
              error={this.state.error.name}
            />
            <Input
              type="email"
              name="email"
              label="Email"
              value={account.email}
              onChange={this.handleChange}
              error={this.state.error.email}
            />
            <Input
              type="password"
              name="password"
              label="Password"
              value={account.password}
              onChange={this.handleChange}
              error={this.state.error.password}
            />

            <button
              disabled={this.validate()}
              className="btn btn-primary"
              style={{ marginTop: "20px", float: "-moz-initial" }}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authUser: { loading, error, user } }) => ({
  loading,
  error,
  user,
});
const mapDispatchToProps = (dispatch) => ({
  doSignUp: (name, email, password) =>
    dispatch(doSignUp(name, email, password)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
