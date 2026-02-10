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

const baseUrl = "http://localhost:5454";

export const getAssetById= (assetId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ASSET_REQUEST });

    const jwt = localStorage.getItem("jwt");

    const response = await axios.get(
      `${baseUrl}/api/assets/${assetId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );

    dispatch({
      type: GET_ASSET_SUCCESS,
      payload: response.data
    });
    console.log("getAssetById",response.data)

  } catch (error) {
    dispatch({
      type: GET_ASSET_FAILURE,
      payload: error.response?.data?.message || "Failed to load asset"
    });
  }
};

export const getAssetDetails = (coinId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ASSET_DETAILS_REQUEST });

    const jwt = localStorage.getItem("jwt");

    const response = await axios.get(
      `${baseUrl}/api/asset/coin/${coinId}/user`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );

    dispatch({
      type: GET_ASSET_DETAILS_SUCCESS,
      payload: response.data
    });
    console.log("getAssetByCoinId",response.data)

  } catch (error) {
    dispatch({
      type: GET_ASSET_DETAILS_FAILURE,
      payload: error.response?.data?.message || "Failed to load asset details"
    });
  }
};

export const getUserAssets = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_ASSETS_REQUEST });

    const jwt = localStorage.getItem("jwt");

    const response = await axios.get(
      `${baseUrl}/api/asset`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );

    dispatch({
      type: GET_USER_ASSETS_SUCCESS,
      payload: response.data
    });

  } catch (error) {
    dispatch({
      type: GET_USER_ASSETS_FAILURE,
      payload: error.response?.data?.message || "Failed to load user assets"
    });
  }
};
