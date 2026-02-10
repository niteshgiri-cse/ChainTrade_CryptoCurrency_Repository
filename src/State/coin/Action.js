import axios from "axios";
import {
  FETCH_COIN_LIST_REQUEST,
  FETCH_COIN_LIST_SUCCESS,
  FETCH_COIN_LIST_FAILURE,
  FETCH_TOP_50_COINS_REQUEST,
  FETCH_TOP_50_COINS_SUCCESS,
  FETCH_TOP_50_COINS_FAILURE,
  FETCH_MARKET_CHART_REQUEST,
  FETCH_MARKET_CHART_SUCCESS,
  FETCH_MARKET_CHART_FAILURE,
  FETCH_COIN_DETAILS_REQUEST,
  FETCH_COIN_DETAILS_SUCCESS,
  FETCH_COIN_DETAILS_FAILURE,
  SEARCH_COIN_REQUEST,
  SEARCH_COIN_SUCCESS,
  SEARCH_COIN_FAILURE
} from "./ActionType";

import { API_BASE_URL } from "@/config/api";

export const getCoinList = (page = 1) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_COIN_LIST_REQUEST });

    const { data } = await axios.get(
      `${API_BASE_URL}/coins?page=${page}`
    );

    dispatch({
      type: FETCH_COIN_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_COIN_LIST_FAILURE,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch coin list"
    });
  }
};

export const fetchTop50Coins = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TOP_50_COINS_REQUEST });

    const { data } = await axios.get(
      `${API_BASE_URL}/coins/top50`
    );

    dispatch({
      type: FETCH_TOP_50_COINS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_TOP_50_COINS_FAILURE,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch top 50 coins"
    });
  }
};

export const fetchMarketChart =
  ({ coinId, days, jwt }) =>
  async (dispatch) => {
    try {
      dispatch({ type: FETCH_MARKET_CHART_REQUEST });

      const { data } = await axios.get(
        `${API_BASE_URL}/coins/${coinId}/chart?days=${days}`,
        {
          headers: jwt
            ? { Authorization: `Bearer ${jwt}` }
            : {}
        }
      );

      dispatch({
        type: FETCH_MARKET_CHART_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: FETCH_MARKET_CHART_FAILURE,
        payload:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch market chart"
      });
    }
  };

export const fetchCoinDetails =
  ({ coinId, jwt }) =>
  async (dispatch) => {
    try {
      dispatch({ type: FETCH_COIN_DETAILS_REQUEST });

      const { data } = await axios.get(
        `${API_BASE_URL}/coins/${coinId}/details`,
        {
          headers: jwt
            ? { Authorization: `Bearer ${jwt}` }
            : {}
        }
      );

      dispatch({
        type: FETCH_COIN_DETAILS_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: FETCH_COIN_DETAILS_FAILURE,
        payload:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch coin details"
      });
    }
  };

export const searchCoin = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_COIN_REQUEST });

    const { data } = await axios.get(
      `${API_BASE_URL}/coins/search?q=${encodeURIComponent(keyword)}`
    );

    dispatch({
      type: SEARCH_COIN_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SEARCH_COIN_FAILURE,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to search coins"
    });
  }
};
