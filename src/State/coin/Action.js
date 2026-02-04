import axios from "axios"
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
} from "./ActionType"

import { API_BASE_URL } from "@/config/api"

export const getCoinList = (page = 1) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_COIN_LIST_REQUEST })

    const response = await axios.get(
      `${API_BASE_URL}/coins?page=${page}`
    )

    dispatch({
      type: FETCH_COIN_LIST_SUCCESS,
      payload: response.data,
    })

  } catch (error) {
    dispatch({
      type: FETCH_COIN_LIST_FAILURE,
      payload: error.response?.data?.message || error.message,
    })
  }
}

export const fetchTop50Coins = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TOP_50_COINS_REQUEST })

    const response = await axios.get(
      `${API_BASE_URL}/coins/top50`
    )

    dispatch({
      type: FETCH_TOP_50_COINS_SUCCESS,
      payload: response.data,
    })

  } catch (error) {
    dispatch({
      type: FETCH_TOP_50_COINS_FAILURE,
      payload: error.response?.data?.message || error.message,
    })
  }
}

export const fetchMarketChart =
  ({ coinId, days, jwt }) =>
  async (dispatch) => {
    try {
      dispatch({ type: FETCH_MARKET_CHART_REQUEST })

      const response = await axios.get(
        `${API_BASE_URL}/coins/${coinId}/chart?days=${days}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )

      dispatch({
        type: FETCH_MARKET_CHART_SUCCESS,
        payload: response.data,
      })

    } catch (error) {
      dispatch({
        type: FETCH_MARKET_CHART_FAILURE,
        payload: error.response?.data?.message || error.message,
      })
    }
  }

export const fetchCoinDetails =
  ({ coinId, jwt }) =>
  async (dispatch) => {
    try {
      dispatch({ type: FETCH_COIN_DETAILS_REQUEST })

      const response = await axios.get(
        `${API_BASE_URL}/coins/${coinId}/details`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )

      dispatch({
        type: FETCH_COIN_DETAILS_SUCCESS,
        payload: response.data,
      })

    } catch (error) {
      dispatch({
        type: FETCH_COIN_DETAILS_FAILURE,
        payload: error.response?.data?.message || error.message,
      })
    }
  }

export const searchCoin = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_COIN_REQUEST })

    const response = await axios.get(
      `${API_BASE_URL}/coins/search?q=${keyword}`
    )

    dispatch({
      type: SEARCH_COIN_SUCCESS,
      payload: response.data,
    })

  } catch (error) {
    dispatch({
      type: SEARCH_COIN_FAILURE,
      payload: error.response?.data?.message || error.message,
    })
  }
}
