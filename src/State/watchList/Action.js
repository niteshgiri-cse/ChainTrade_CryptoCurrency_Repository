import axios from "axios";
import {
  GET_WATCHLIST_REQUEST,
  GET_WATCHLIST_SUCCESS,
  GET_WATCHLIST_FAILURE,
  ADD_TO_WATCHLIST_REQUEST,
  ADD_TO_WATCHLIST_SUCCESS,
  ADD_TO_WATCHLIST_FAILURE
} from "./ActionType";

import { API_BASE_URL } from "@/config/api";

export const getUserWatchlist = () => async (dispatch) => {
  try {
    dispatch({ type: GET_WATCHLIST_REQUEST });

    const jwt = localStorage.getItem("jwt");

    const { data } = await axios.get(
      `${API_BASE_URL}/api/watchlist/user`,
      {
        headers: jwt
          ? { Authorization: `Bearer ${jwt}` }
          : {}
      }
    );

    dispatch({
      type: GET_WATCHLIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_WATCHLIST_FAILURE,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load watchlist"
    });
  }
};

export const addItemToWatchlist = (coinId) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_WATCHLIST_REQUEST });

    const jwt = localStorage.getItem("jwt");

    const { data } = await axios.patch(
      `${API_BASE_URL}/api/watchlist/add/coin/${coinId}`,
      {},
      {
        headers: jwt
          ? { Authorization: `Bearer ${jwt}` }
          : {}
      }
    );

    dispatch({
      type: ADD_TO_WATCHLIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ADD_TO_WATCHLIST_FAILURE,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to add coin"
    });
  }
};
