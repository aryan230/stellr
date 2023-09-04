import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADRESS,
} from "../constants/cartConstants";
import { STATE_ADD_ITEM, STATE_REMOVE_ITEM } from "../constants/stateConstants";

export const addToState = (data) => async (dispatch, getState) => {
  dispatch({
    type: STATE_ADD_ITEM,
    payload: data,
  });

  localStorage.setItem("stateDetails", JSON.stringify(data));
};

export const removeFromState = (id) => (dispatch, getState) => {
  dispatch({
    type: STATE_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "stateItems",
    JSON.stringify(getState().state.stateItems)
  );
};
