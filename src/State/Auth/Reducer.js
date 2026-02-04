import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_USER_SUCCESS,
  LOGIN_REQUEST,
  GET_USER_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_FAILURE,
  LOGOUT
} from "./ActionType";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: localStorage.getItem("jwt") || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("jwt", action.payload);
      return {
        ...state,
        loading: false,
        error: null,
        jwt: action.payload,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("jwt");
      return {
        user: null,
        loading: false,
        error: null,
        jwt: null,
      };

    default:
      return state;
  }
};

export default authReducer;
