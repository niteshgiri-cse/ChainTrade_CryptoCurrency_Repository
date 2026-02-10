import axios from "axios";
import {
  WITHDRAWAL_REQUEST,
  WITHDRAWAL_SUCCESS,
  WITHDRAWAL_FAILURE,

  WITHDRAWAL_PROCEED_REQUEST,
  WITHDRAWAL_PROCEED_SUCCESS,
  WITHDRAWAL_PROCEED_FAILURE,

  GET_WITHDRAWAL_HISTORY_REQUEST,
  GET_WITHDRAWAL_HISTORY_SUCCESS,
  GET_WITHDRAWAL_HISTORY_FAILURE,

  GET_WITHDRAWAL_REQUEST_REQUEST,
  GET_WITHDRAWAL_REQUEST_SUCCESS,
  GET_WITHDRAWAL_REQUEST_FAILURE,
  ADD_PAYMENT_DETAILS_REQUEST,
  GET_PAYMENT_DETAILS_FAILURE,
  GET_PAYMENT_DETAILS_SUCCESS,
  GET_PAYMENT_DETAILS_REQUEST,
  ADD_PAYMENT_DETAILS_FAILURE,
  ADD_PAYMENT_DETAILS_SUCCESS
} from "./ActionType";

import { API_BASE_URL } from "@/config/api";

export const requestWithdrawal =
  ({ amount, jwt }) =>
  async (dispatch) => {
    try {
      dispatch({ type: WITHDRAWAL_REQUEST });

      const response = await axios.post(
        `${API_BASE_URL}/api/withdrawal/${amount}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: WITHDRAWAL_SUCCESS,
        payload: response.data,
      });
      console.log("withdrawal request->",response.data);

    } catch (error) {
      dispatch({
        type: WITHDRAWAL_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const proceedWithdrawal =
  ({ id, accept, jwt }) =>
  async (dispatch) => {
    try {
      dispatch({ type: WITHDRAWAL_PROCEED_REQUEST });

      const response = await axios.patch(
        `${API_BASE_URL}/api/admin/withdrawal/${id}/proceed/${accept}`,
    null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: WITHDRAWAL_PROCEED_SUCCESS,
        payload: response.data,
      });

    } catch (error) {
      dispatch({
        type: WITHDRAWAL_PROCEED_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };


export const getWithdrawalHistory =
  ({ jwt }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_WITHDRAWAL_HISTORY_REQUEST });

      const response = await axios.get(
        `${API_BASE_URL}/api/withdrawal`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: GET_WITHDRAWAL_HISTORY_SUCCESS,
        payload: response.data,
      });

    } catch (error) {
      dispatch({
        type: GET_WITHDRAWAL_HISTORY_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };


export const getAllWithdrawalRequests =
  ({ jwt }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_WITHDRAWAL_REQUEST_REQUEST });

      const response = await axios.get(
        `${API_BASE_URL}/api/admin/withdrawal`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: GET_WITHDRAWAL_REQUEST_SUCCESS,
        payload: response.data,
      });

    } catch (error) {
      dispatch({
        type: GET_WITHDRAWAL_REQUEST_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
export const addPaymentDetails =
  ({ paymentData, jwt }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_PAYMENT_DETAILS_REQUEST });

      const response = await axios.post(
        `${API_BASE_URL}/api/payment-details`,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("add payment details:",response.data)
      dispatch({
        type: ADD_PAYMENT_DETAILS_SUCCESS,
        payload: response.data,
      });

    } catch (error) {
      dispatch({
        type: ADD_PAYMENT_DETAILS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  export const getPaymentDetails =
  ({ jwt }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_PAYMENT_DETAILS_REQUEST });

      const response = await axios.get(
        `${API_BASE_URL}/api/payment-details`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: GET_PAYMENT_DETAILS_SUCCESS,
        payload: response.data,
      });
      console.log(response.data)

    } catch (error) {
      dispatch({
        type: GET_PAYMENT_DETAILS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };