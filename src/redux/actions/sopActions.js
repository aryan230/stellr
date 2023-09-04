import axios from "axios";
import URL from "./../../Data/data.json";
import {
  SOP_CREATE_FAIL,
  SOP_CREATE_REQUEST,
  SOP_CREATE_SUCESS,
  SOP_LIST_MY_FAIL,
  SOP_LIST_MY_REQUEST,
  SOP_LIST_MY_SUCESS,
} from "../constants/sopConstants";

export const createSops = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SOP_CREATE_REQUEST,
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
    const { data } = await axios.post(`${URL[0]}api/sops`, project, config);

    dispatch({
      type: SOP_CREATE_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SOP_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMySops = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SOP_LIST_MY_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${URL[0]}api/sops/${id}`, config);

    dispatch({
      type: SOP_LIST_MY_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SOP_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
