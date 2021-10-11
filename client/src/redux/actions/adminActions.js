import axios from 'axios';
import {
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_RESET,
  UPDATE_USER_SUCCESS,
} from '../constants/adminConstants';

// GET USERS
export const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USERS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/users', config);

    dispatch({ type: GET_USERS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};

// GET USER
export const getUserDetails = id => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};

// UPDATE USER
export const updateUser = user => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put('/api/users', user, config);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.data });
    dispatch({ type: UPDATE_USER_RESET });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};
