
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

const baseUrl = "http://localhost:5454";



export const payOrder = ({orderData,jwt,amount}) => async (dispatch) => {
  try {
    dispatch({ type: PAY_ORDER_REQUEST });

    const response = await axios.post(
  `${baseUrl}/api/orders/pay`,
  orderData,
  {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }
);
    dispatch({
      type: PAY_ORDER_SUCCESS,
      payload: response.data,
      amount
    });
    console.log("Order Success",response.data)

  } catch (error) {
    dispatch({
      type: PAY_ORDER_FAILURE,
      payload: error.response?.data?.message || "Payment failed"
    });
  }
};



export const getOrderById = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });

    const jwt = localStorage.getItem("jwt");

    const response = await axios.get(
      `${baseUrl}/api/orders/${orderId}`,
      {
        headers: {
          Authentication: jwt
        }
      }
    );

    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: response.data
    });

  } catch (error) {
    dispatch({
      type: GET_ORDER_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch order"
    });
  }
};



export const getAllOrdersForUser = ({order_type, asset_symbol,jwt}) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ORDERS_REQUEST });
    
    const response = await axios.get(
      `${baseUrl}/api/orders`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        },
        params: {
          order_type,
          asset_symbol
        }
      }
    );

    dispatch({
      type: GET_ALL_ORDERS_SUCCESS,
      payload: response.data
    });
    console.log("get all order ",response.data)

  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch orders"
    });
  }
};


