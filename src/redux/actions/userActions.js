import axios from "axios";
import {
  USER_ADMIN_METRICS_FAIL,
  USER_ADMIN_METRICS_REQUEST,
  USER_ADMIN_METRICS_SUCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCESS,
  USER_LOGOUT,
  USER_PASSWORD_FORGOT_FAIL,
  USER_PASSWORD_FORGOT_REQUEST,
  USER_PASSWORD_FORGOT_SUCESS,
  USER_PASSWORD_RESET_FAIL,
  USER_PASSWORD_RESET_REQUEST,
  USER_PASSWORD_RESET_SUCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCESS,
} from "../constants/userConstants";
import { PROJECT_LIST_MY_RESET } from "../constants/projectConstants";
import URL from "./../../Data/data.json";
import { CART_RESET } from "../constants/cartConstants";
export const login = (someData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${URL[0]}api/users/login`,
      someData,
      config
    );

    dispatch({
      type: USER_LOGIN_SUCESS,
      payload: data,
    });

    localStorage.setItem("userStellr", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginGoogle = (someData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${URL[0]}api/users/google`,
      someData,
      config
    );

    dispatch({
      type: USER_LOGIN_SUCESS,
      payload: data,
    });

    localStorage.setItem("userStellr", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginMicrosoft = (someData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${URL[0]}api/users/microsoft`,
      someData,
      config
    );

    dispatch({
      type: USER_LOGIN_SUCESS,
      payload: data,
    });

    localStorage.setItem("userStellr", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userStellr");
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({ type: CART_RESET });
  dispatch({
    type: USER_DETAILS_RESET,
  });
  dispatch({
    type: PROJECT_LIST_MY_RESET,
  });
  // dispatch({
  //   type: ORDER_LIST_MY_RESET,
  // });
  dispatch({ type: USER_LIST_RESET });
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAdress");
  // dispatch({ type: CART_RESET });
};

export const register = (dataGiven) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`${URL[0]}api/users`, dataGiven, config);

    dispatch({
      type: USER_REGISTER_SUCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCESS,
      payload: data,
    });

    localStorage.setItem("userStellr", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
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
    const { data } = await axios.get(`${URL[0]}api/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserAdminMetrics = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADMIN_METRICS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${URL[0]}api/users/userMetrics`, config);

    dispatch({
      type: USER_ADMIN_METRICS_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ADMIN_METRICS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
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
    const { data } = await axios.put(
      `${URL[0]}api/users/profile`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_PROFILE_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `https://thefarsan-backend.onrender.com/api/users`,
      config
    );

    dispatch({
      type: USER_LIST_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(
      `https://thefarsan-backend.onrender.com/api/users/${id}`,
      config
    );

    dispatch({
      type: USER_DELETE_SUCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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
    const { data } = await axios.put(
      `https://thefarsan-backend.onrender.com/api/users/${user._id}`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_SUCESS,
    });
    dispatch({
      type: USER_DETAILS_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PASSWORD_FORGOT_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "https://thefarsan-backend.onrender.com/api/users/forgotPassword",
      { email },
      config
    );

    dispatch({
      type: USER_PASSWORD_FORGOT_SUCESS,
      payload: true,
    });
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_FORGOT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetPassword = (id, token, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PASSWORD_RESET_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "https://thefarsan-backend.onrender.com/api/users/reset",
      { id, token, password },
      config
    );

    dispatch({
      type: USER_PASSWORD_RESET_SUCESS,
      payload: true,
    });
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_RESET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
