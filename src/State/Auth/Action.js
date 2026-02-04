import axios from "axios";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS
} from "./ActionType";

const baseUrl = "http://localhost:5454";

export const register = (userData) => async (dispatch) => {
  try {
    console.log("REGISTER DATA SENT:", userData);

    dispatch({ type: REGISTER_REQUEST });

    const response = await axios.post(`${baseUrl}/auth/signup`, userData);

    console.log("REGISTER RESPONSE:", response.data);

    const user = response.data;

    localStorage.setItem("jwt", user.jwt);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: user.jwt
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error.response);

    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || "Registration failed",
    });
  }
};


export const login = (userData) => async (dispatch) => {
  try {
    console.log("LOGIN DATA SENT:", userData);

    dispatch({ type: LOGIN_REQUEST });

    const response = await axios.post(`${baseUrl}/auth/signin`, userData);

    console.log("LOGIN RESPONSE:", response.data);

    const user = response.data;

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: user.jwt
      });
    } else {
      console.log("Two Factor Required:", user);
    }

  } catch (error) {
    console.log("LOGIN ERROR:", error.response);

    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || "Login failed",
    });
  }
};


export const getUser = (jwt) => async (dispatch) => {
  try {
    console.log("JWT SENT:", jwt);

    dispatch({ type: GET_USER_REQUEST });

    const response = await axios.get(
      `${baseUrl}/api/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );

    console.log("GET USER RESPONSE:", response.data);

    dispatch({
      type: GET_USER_SUCCESS,
      payload: response.data
    });

  } catch (error) {
    console.log("GET USER ERROR:", error.response);

    dispatch({
      type: GET_USER_FAILURE,
      payload: error.response?.data?.message || "Failed to load user",
    });
  }
};

export const logout=()=>(dispatch)=>{
  localStorage.clear();
  dispatch({ type:LOGOUT})
}
