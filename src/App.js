import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import About from "./components/About";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const App = () => {
  const { user } = useSelector((state) => state.authUser);
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/login"
          render={() => (user ? <Redirect to="/dashboard" /> : <Login />)}
        />
        <Route
          exact
          path="/signup"
          render={() => (user ? <Redirect to="/dashboard" /> : <SignUp />)}
        />
        <Route
          path="/dashboard"
          render={() => (user ? <Dashboard /> : <Redirect to="/login" />)}
        />
        <Route path="/about" component={About} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};
// {
//   !user && (
//     <>
//       <Route path="/login" component={Login} />
//       <Route path="/signup" component={SignUp} />
//     </>
//   );
// }
export default App;
