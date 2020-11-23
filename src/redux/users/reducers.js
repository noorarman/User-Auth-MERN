const INITIAL_STATE = {
  user: null,
  error: null,
  loading: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "MAKE_REQUEST":
      return {
        loading: true,
      };
    case "SIGN_IN":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "SIGN_UP":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case "SIGN_OUT":
      return {
        ...state,
        loading: false,
        user: null,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
