import axios from "axios";
import {
  GET_ASSET_REQUEST,
  GET_ASSET_SUCCESS,
  GET_ASSET_FAILURE,
  GET_USER_ASSETS_REQUEST,
  GET_USER_ASSETS_SUCCESS,
  GET_USER_ASSETS_FAILURE,
  GET_ASSET_DETAILS_REQUEST,
  GET_ASSET_DETAILS_SUCCESS,
  GET_ASSET_DETAILS_FAILURE
} from "./ActonType.js";

import { API_BASE_URL } from "@/config/api";

export const getAssetById = (assetId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ASSET_REQUEST });

    const jwt = localStorage.getItem("jwt");

    const { data } = await axios.get(
      `${API_BASE_URL}/api/assets/${assetId}`,
      {
        headers: jwt
          ? { Authorization: `Bearer ${jwt}` }
          : {}
      }
    );

    dispatch({
      type: GET_ASSET_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_ASSET_FAILURE,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load asset"
    });
  }
};

export const getAssetDetails = (coinId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ASSET_DETAILS_REQUEST });

    const jwt = localStorage.getItem("jwt");

    const { data } = await axios.get(
      `${API_BASE_URL}/api/asset/coin/${coinId}/user`,
      {
        headers: jwt
          ? { Authorization: `Bearer ${jwt}` }
          : {}
      }
    );

    dispatch({
      type: GET_ASSET_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_ASSET_DETAILS_FAILURE,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load asset details"
    });
  }
};

export const getUserAssets = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_ASSETS_REQUEST });

    const jwt = localStorage.getItem("jwt");

    const { data } = await axios.get(
      `${API_BASE_URL}/api/asset`,
      {
        headers: jwt
          ? { Authorization: `Bearer ${jwt}` }
          : {}
      }
    );

    dispatch({
      type: GET_USER_ASSETS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_USER_ASSETS_FAILURE,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load user assets"
    });
  }
};
