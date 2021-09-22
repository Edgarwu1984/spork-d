import axios from 'axios';
import {
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_RESET,
} from '../constants/userConstants';

// LOGIN USER
export const loginUser = (email, password) => async dispatch => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.data });
    localStorage.setItem('userInfo', JSON.stringify(data.data));
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};

// REGISTER USER
export const registerUser = (email, password, username) => async dispatch => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/register',
      { email, password, username },
      config
    );

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};

// LOGOUT USER
export const logoutUser = () => async dispatch => {
  localStorage.removeItem('userInfo');
  dispatch({ type: LOGOUT_USER });
};

// GET USER PROFILE
export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/users/profile', config);

    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};

// UPDATE USER PROFILE
export const updateUserProfile = user => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put('/api/users/profile', user, config);
    dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: data.data });
    dispatch({ type: UPDATE_USER_PROFILE_RESET });
    localStorage.removeItem('userInfo');
    dispatch({ type: LOGOUT_USER });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};
