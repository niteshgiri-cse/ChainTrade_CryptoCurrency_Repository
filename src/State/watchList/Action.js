import axios from "axios";
import {
  GET_WATCHLIST_REQUEST,
  GET_WATCHLIST_SUCCESS,
  GET_WATCHLIST_FAILURE,
  ADD_TO_WATCHLIST_REQUEST,
  ADD_TO_WATCHLIST_SUCCESS,
  ADD_TO_WATCHLIST_FAILURE
} from "./ActionType";

const baseUrl = "http://localhost:5454";

export const getUserWatchlist = () => async (dispatch) => {
  try {
    dispatch({ type: GET_WATCHLIST_REQUEST });

    const jwt = localStorage.getItem("jwt");

    const response = await axios.get(
      `${baseUrl}/api/watchlist/user`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );

    dispatch({
      type: GET_WATCHLIST_SUCCESS,
      payload: response.data
    });
    console.log("user watch list",response.data);

  } catch (error) {
    dispatch({
      type: GET_WATCHLIST_FAILURE,
      payload: error.response?.data?.message || "Failed to load watchlist"
    });
  }
};

export const addItemToWatchlist = (coinId) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_WATCHLIST_REQUEST });

    const jwt = localStorage.getItem("jwt");

    const response = await axios.patch(
      `${baseUrl}/api/watchlist/add/coin/${coinId}`,{},
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );

    dispatch({
      type: ADD_TO_WATCHLIST_SUCCESS,
      payload: response.data
    });

  } catch (error) {
    dispatch({
      type: ADD_TO_WATCHLIST_FAILURE,
      payload: error.response?.data?.message || "Failed to add coin"
    });
  }
};
