import axios from "axios";

export const doSignIn = (email, password) => (dispatch) => {
  dispatch({ type: "MAKE_REQUEST" });

  axios
    .post("http://localhost:5000/api/users/sign-in", {
      email,
      password,
    })
    .then(({ data }) => {
      localStorage.setItem("token", "Bearer " + data.token);
      dispatch({ type: "SIGN_IN", payload: data.user });
    })
    .catch((error) => {
      if (error.response.data.msg) {
        console.log(error.response.data.msg);
        dispatch({ type: "ERROR", payload: error.response.data.msg });
      } else dispatch({ type: "ERROR", payload: error.message });
    });
};
export const doSignUp = (name, email, password) => (dispatch) => {
  dispatch({ type: "MAKE_REQUEST" });

  axios
    .post("http://localhost:5000/api/users/sign-up", {
      name,
      email,
      password,
    })
    .then(({ data }) => {
      localStorage.setItem("token", "Bearer " + data.token);
      dispatch({ type: "SIGN_UP", payload: data.user });
    })
    .catch((error) => {
      if (error.response.data.msg) {
        console.log(error.response.data.msg);
        dispatch({ type: "ERROR", payload: error.response.data.msg });
      } else dispatch({ type: "ERROR", payload: error.message });
    });
};
export const doSignOut = () => async (dispatch) => {
  try {
    dispatch({ type: "MAKE_REQUEST" });
    localStorage.removeItem("token");
    dispatch({ type: "SIGN_OUT" });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.message });
  }
};
