import axios from "axios";
import URL from "./../../Data/data.json";
import {
  PROTOCOL_CREATE_FAIL,
  PROTOCOL_CREATE_REQUEST,
  PROTOCOL_CREATE_SUCESS,
  PROTOCOL_LIST_MY_FAIL,
  PROTOCOL_LIST_MY_REQUEST,
  PROTOCOL_LIST_MY_SUCESS,
} from "../constants/protocolConstants";

export const createProtocol = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROTOCOL_CREATE_REQUEST,
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
    const { data } = await axios.post(
      `${URL[0]}api/protocols`,
      project,
      config
    );

    dispatch({
      type: PROTOCOL_CREATE_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROTOCOL_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyProtocols = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROTOCOL_LIST_MY_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${URL[0]}api/protocols/${id}`, config);

    dispatch({
      type: PROTOCOL_LIST_MY_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROTOCOL_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
