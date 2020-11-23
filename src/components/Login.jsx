import React, { Component } from "react";
import joi from "joi-browser";
import Input from "./Input";
import "./Login.css";
import { connect } from "react-redux";
import { doSignIn } from "../redux/users/actions";

class Login extends Component {
  state = {
    account: { email: "", password: "" },
    error: {},
    isValidUser: "",
  };
  schema = {
    email: joi.string().email({ minDomainAtoms: 2 }).required().label("email"),
    password: joi.string().required().label("password"),
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
    this.props.doSignIn(this.state.account.email, this.state.account.password);
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleChange = ({ currentTarget: input }) => {
    const error = { ...this.state.error };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, error });
  };

  componentDidUpdate() {
    if (this.props.user) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
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
          <h1 style={{ textAlign: "center" }}>Log in </h1>
          <form onSubmit={this.handleSubmit} style={{ paddingTop: "20px" }}>
            <Input
              type="email"
              onChange={this.handleChange}
              value={this.state.account.email}
              name="email"
              label="Email"
              error={this.state.error.email}
            />
            <Input
              type="password"
              onChange={this.handleChange}
              value={this.state.account.password}
              name="password"
              label="Password"
              error={this.state.error.password}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={this.validate()}
              style={{ marginTop: "20px", float: "-moz-initial" }}
            >
              Signin
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  doSignIn: (email, password) => dispatch(doSignIn(email, password)),
});
const mapStateToProps = ({ authUser: { loading, error, user } }) => ({
  loading,
  error,
  user,
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
