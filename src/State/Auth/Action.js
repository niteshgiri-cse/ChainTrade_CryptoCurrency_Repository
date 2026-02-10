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
import { API_BASE_URL } from "@/config/api";

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);

    if (data?.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data?.jwt || null
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed"
    });
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, userData);

    if (data?.jwt) {
      localStorage.setItem("jwt", data.jwt);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.jwt
      });
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: "Authentication failed"
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Login failed"
    });
  }
};

export const getUser = (jwt) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const { data } = await axios.get(
      `${API_BASE_URL}/api/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );

    dispatch({
      type: GET_USER_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load user"
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT });
};
