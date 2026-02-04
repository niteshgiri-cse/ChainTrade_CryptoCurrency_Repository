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
import { Navigate } from "react-router-dom";

export const getUserWallet = (jwt) => async (dispatch) => {
  try {
    console.log("GET WALLET JWT:", jwt);

    dispatch({ type: GET_USER_WALLET_REQUEST });

    const response = await axios.get(
      `${API_BASE_URL}/api/wallet`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );

    console.log("GET WALLET RESPONSE:", response.data);

    dispatch({
      type: GET_USER_WALLET_SUCCESS,
      payload: response.data
    });

  } catch (error) {
    console.log("GET WALLET ERROR:", error.response);

    dispatch({
      type: GET_USER_WALLET_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch wallet"
    });
  }
};


export const transferMoney = (jwt, walletId, amount) => async (dispatch) => {
  try {
    console.log("TRANSFER DATA:", { walletId, amount });

    dispatch({ type: TRANSFER_MONEY_REQUEST });

    const response = await axios.put(
      `${API_BASE_URL}/api/wallet/${walletId}/transfer`,
      { amount },
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );

    console.log("TRANSFER RESPONSE:", response.data);

    dispatch({
      type: TRANSFER_MONEY_SUCCESS,
      payload: response.data
    });

  } catch (error) {
    console.log("TRANSFER ERROR:", error.response);

    dispatch({
      type: TRANSFER_MONEY_FAILURE,
      payload: error.response?.data?.message || "Transfer failed"
    });
  }
};


export const payOrder = (jwt, orderId) => async (dispatch) => {
  try {
    console.log("PAY ORDER:", orderId);

    dispatch({ type: GET_WALLET_TRANSACTION_REQUEST });

    const response = await axios.put(
      `${API_BASE_URL}/api/wallet/order/${orderId}/pay`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );

    console.log("PAY ORDER RESPONSE:", response.data);

    dispatch({
      type: GET_WALLET_TRANSACTION_SUCCESS,
      payload: response.data
    });

  } catch (error) {
    console.log("PAY ORDER ERROR:", error.response);

    dispatch({
      type: GET_WALLET_TRANSACTION_FAILURE,
      payload: error.response?.data?.message || "Payment failed"
    });
  }
};


export const depositMoney =
  (jwt, orderId, paymentId) =>
  async (dispatch) => {

    try {

      dispatch({ type: DEPOSIT_MONEY_REQUEST });

      const response = await axios.put(
        `${API_BASE_URL}/api/wallet/deposit?order_id=${orderId}&payment_id=${paymentId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: DEPOSIT_MONEY_SUCCESS,
        payload: response.data,
      });

    } catch (error) {

      dispatch({
        type: DEPOSIT_MONEY_FAILURE,
        error: error.message,
      });

    }
  };



export const getWalletTransaction=({jwt})=>async(dispatch)=>{
    try {
        dispatch({type:GET_WALLET_TRANSACTION_REQUEST});
        const response = await axios.get(
      `${API_BASE_URL}/api/wallet/transactions`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );
    
    dispatch({
      type: GET_WALLET_TRANSACTION_SUCCESS,
      payload: response.data
    });
    console.log("GET_WALLET_TRANSACTION_SUCCESS",response.data)

    } catch (error) {
         console.log("error",error);
        dispatch({
            type:GET_WALLET_TRANSACTION_FAILURE,
            error:error.message
        })
    }
}
export const paymentHandler =
  ({ jwt, amount, paymentMethod }) =>
  async (dispatch) => {

    dispatch({ type: DEPOSIT_MONEY_REQUEST });

    try {

      const response = await axios.post(
        `${API_BASE_URL}/api/payment/${paymentMethod}/amount/${amount}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      // Open Razorpay
      window.location.href = response.data.payment_url;

    } catch (error) {

      dispatch({
        type: DEPOSIT_MONEY_FAILURE,
        error: error.message,
      });

    }
  };
