import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADRESS,
} from "../constants/cartConstants";

export const addToCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: data,
  });

  localStorage.setItem(
    "tabDetails",
    JSON.stringify(getState().cart.tabDetails)
  );
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "tabDetails",
    JSON.stringify(getState().cart.tabDetails)
  );
};
