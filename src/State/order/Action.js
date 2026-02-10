import axios from "axios";
import {
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
  PAY_ORDER_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAILURE
} from "./ActionType";

import { API_BASE_URL } from "@/config/api";

export const payOrder = ({ orderData, jwt, amount }) => async (dispatch) => {
  try {
    dispatch({ type: PAY_ORDER_REQUEST });

    const { data } = await axios.post(
      `${API_BASE_URL}/api/orders/pay`,
      orderData,
      {
        headers: jwt
          ? { Authorization: `Bearer ${jwt}` }
          : {}
      }
    );

    dispatch({
      type: PAY_ORDER_SUCCESS,
      payload: data,
      amount
    });
  } catch (error) {
    dispatch({
      type: PAY_ORDER_FAILURE,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Payment failed"
    });
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });

    const jwt = localStorage.getItem("jwt");

    const { data } = await axios.get(
      `${API_BASE_URL}/api/orders/${orderId}`,
      {
        headers: jwt
          ? { Authorization: `Bearer ${jwt}` }
          : {}
      }
    );

    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAILURE,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch order"
    });
  }
};

export const getAllOrdersForUser =
  ({ order_type, asset_symbol, jwt }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_ORDERS_REQUEST });

      const { data } = await axios.get(
        `${API_BASE_URL}/api/orders`,
        {
          headers: jwt
            ? { Authorization: `Bearer ${jwt}` }
            : {},
          params: {
            order_type,
            asset_symbol
          }
        }
      );

      dispatch({
        type: GET_ALL_ORDERS_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_ORDERS_FAILURE,
        payload:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch orders"
      });
    }
  };
