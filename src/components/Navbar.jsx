import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doSignOut } from "../redux/users/actions";

const Navbar = () => {
  const { user } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light "
        style={{ backgroundColor: "#305f7a", boxShadow: "10px 10px 5px " }}
      >
        <Link to="/">
          <i className="fab fa-node-js fa-3x" style={{ color: "white" }}></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto " style={{ fontSize: "18px" }}>
            <li className="nav-item active">
              <NavLink to="/" className="nav-link" style={{ color: "white" }}>
                <button className="btn btn-primary">Home</button>
              </NavLink>
            </li>
            {!user ? (
              <>
                <li className="nav-item active">
                  <NavLink
                    to="/login"
                    className="nav-link"
                    style={{ color: "white" }}
                  >
                    <button className="btn btn-primary">Log in</button>
                  </NavLink>
                </li>
                <li className="nav-item active">
                  <NavLink
                    to="/signup"
                    className="nav-link"
                    style={{ color: "white" }}
                  >
                    <button className="btn btn-primary">Sign Up</button>
                  </NavLink>
                </li>
              </>
            ) : (
              <li style={{ paddingTop: "8px" }} className="nav-item active">
                <button
                  onClick={() => dispatch(doSignOut())}
                  className="btn btn-primary"
                >
                  Log out
                </button>
              </li>
            )}
            <li className="nav-item active">
              <NavLink
                to="/about"
                className="nav-link"
                style={{ color: "white" }}
              >
                <button className="btn btn-primary">About</button>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
