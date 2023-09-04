import axios from "axios";
import {
  ENTRY_CREATE_FAIL,
  ENTRY_CREATE_REQUEST,
  ENTRY_CREATE_SUCESS,
  ENTRY_LIST_MY_FAIL,
  ENTRY_LIST_MY_REQUEST,
  ENTRY_LIST_MY_SUCESS,
} from "../constants/entryConstants";
import URL from "./../../Data/data.json";

export const createEntry = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ENTRY_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`${URL[0]}api/entries`, project, config);

    dispatch({
      type: ENTRY_CREATE_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ENTRY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyEntries = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ENTRY_LIST_MY_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${URL[0]}api/entries/${id}`, config);

    dispatch({
      type: ENTRY_LIST_MY_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ENTRY_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
