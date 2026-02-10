import axios from "axios";
import {
  GET_USER_WALLET_REQUEST,
  GET_USER_WALLET_SUCCESS,
  GET_USER_WALLET_FAILURE,
  GET_WALLET_TRANSACTION_REQUEST,
  GET_WALLET_TRANSACTION_SUCCESS,
  GET_WALLET_TRANSACTION_FAILURE,
  DEPOSIT_MONEY_REQUEST,
  DEPOSIT_MONEY_SUCCESS,
  DEPOSIT_MONEY_FAILURE,
  TRANSFER_MONEY_REQUEST,
  TRANSFER_MONEY_SUCCESS,
  TRANSFER_MONEY_FAILURE
} from "./ActionType";

import { API_BASE_URL } from "@/config/api";

export const getUserWallet = (jwt) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_WALLET_REQUEST });

    const { data } = await axios.get(
      `${API_BASE_URL}/api/wallet`,
      {
        headers: jwt ? { Authorization: `Bearer ${jwt}` } : {}
      }
    );

    dispatch({
      type: GET_USER_WALLET_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_USER_WALLET_FAILURE,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch wallet"
    });
  }
};

export const transferMoney = (jwt, walletId, formData) => async (dispatch) => {
  try {
    dispatch({ type: TRANSFER_MONEY_REQUEST });

    const { data } = await axios.put(
      `${API_BASE_URL}/api/wallet/${walletId}/transfer`,
      { amount: Number(formData?.amount) },
      {
        headers: jwt ? { Authorization: `Bearer ${jwt}` } : {}
      }
    );

    dispatch({
      type: TRANSFER_MONEY_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: TRANSFER_MONEY_FAILURE,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Transfer failed"
    });
  }
};

export const payOrder = (jwt, orderId) => async (dispatch) => {
  try {
    dispatch({ type: GET_WALLET_TRANSACTION_REQUEST });

    const { data } = await axios.put(
      `${API_BASE_URL}/api/wallet/order/${orderId}/pay`,
      {},
      {
        headers: jwt ? { Authorization: `Bearer ${jwt}` } : {}
      }
    );

    dispatch({
      type: GET_WALLET_TRANSACTION_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_WALLET_TRANSACTION_FAILURE,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Payment failed"
    });
  }
};

export const depositMoney =
  (jwt, orderId, paymentId) =>
  async (dispatch) => {
    try {
      dispatch({ type: DEPOSIT_MONEY_REQUEST });

      const { data } = await axios.put(
        `${API_BASE_URL}/api/wallet/deposit?order_id=${orderId}&payment_id=${paymentId}`,
        null,
        {
          headers: jwt ? { Authorization: `Bearer ${jwt}` } : {}
        }
      );

      dispatch({
        type: DEPOSIT_MONEY_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: DEPOSIT_MONEY_FAILURE,
        payload:
          error?.response?.data?.message ||
          error?.message ||
          "Deposit failed"
      });
    }
  };

export const getWalletTransaction = ({ jwt }) => async (dispatch) => {
  try {
    dispatch({ type: GET_WALLET_TRANSACTION_REQUEST });

    const { data } = await axios.get(
      `${API_BASE_URL}/api/wallet/transactions`,
      {
        headers: jwt ? { Authorization: `Bearer ${jwt}` } : {}
      }
    );

    dispatch({
      type: GET_WALLET_TRANSACTION_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_WALLET_TRANSACTION_FAILURE,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch transactions"
    });
  }
};

export const paymentHandler =
  ({ jwt, amount, paymentMethod }) =>
  async (dispatch) => {
    try {
      dispatch({ type: DEPOSIT_MONEY_REQUEST });

      const { data } = await axios.post(
        `${API_BASE_URL}/api/payment/${paymentMethod}/amount/${amount}`,
        null,
        {
          headers: jwt ? { Authorization: `Bearer ${jwt}` } : {}
        }
      );

      if (data?.payment_url) {
        window.location.href = data.payment_url;
      } else {
        dispatch({
          type: DEPOSIT_MONEY_FAILURE,
          payload: "Invalid payment response"
        });
      }
    } catch (error) {
      dispatch({
        type: DEPOSIT_MONEY_FAILURE,
        payload:
          error?.response?.data?.message ||
          error?.message ||
          "Payment initiation failed"
      });
    }
  };
