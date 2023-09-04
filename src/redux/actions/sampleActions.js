import axios from "axios";

import URL from "./../../Data/data.json";
import {
  SAMPLE_CREATE_FAIL,
  SAMPLE_CREATE_REQUEST,
  SAMPLE_CREATE_SUCESS,
  SAMPLE_LIST_MY_FAIL,
  SAMPLE_LIST_MY_REQUEST,
  SAMPLE_LIST_MY_SUCESS,
} from "../constants/sampleConstants";

export const createSample = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SAMPLE_CREATE_REQUEST,
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
    const { data } = await axios.post(`${URL[0]}api/samples`, project, config);

    dispatch({
      type: SAMPLE_CREATE_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SAMPLE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMySamples = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SAMPLE_LIST_MY_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${URL[0]}api/samples/${id}`, config);

    dispatch({
      type: SAMPLE_LIST_MY_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SAMPLE_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
