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
  GET_USER_REVIEWS_REQUEST,
  GET_USER_REVIEWS_SUCCESS,
  GET_USER_REVIEWS_FAIL,
  GET_USER_PROFILE_RESET,
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
      payload: error.response
        ? error.response.data
        : error.response.data.message,
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
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.data });
    localStorage.setItem('userInfo', JSON.stringify(data.data));
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response
        ? error.response.data
        : error.response.data.message,
    });
  }
};

// LOGOUT USER
export const logoutUser = () => async dispatch => {
  localStorage.removeItem('userInfo');
  dispatch({ type: LOGOUT_USER });
  dispatch({ type: GET_USER_PROFILE_RESET });
  document.location.href = '/';
};

// GET USER PROFILE
export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log('From action', userInfo);
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
        error.response && error.response.data
          ? error.response.data.message
          : error.response.data,
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
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Form Config
    // NOTE: It is CRITICAL format the data as it has MIXED data types.  Need to reconstruct the form data and pass in as the PUT call
    const prepareFormData = data => {
      let formData = new FormData();
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('photo', data.photo);
      return formData;
    };

    const { data } = await axios.put(
      '/api/users/profile',
      prepareFormData(user),
      config
    );

    dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: data.data });
    dispatch({ type: UPDATE_USER_PROFILE_RESET });
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.data });
    localStorage.setItem('userInfo', JSON.stringify(data.data));
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_PROFILE_FAIL,
      payload: error.response
        ? error.response.data
        : error.response.data.message,
    });
  }
};

// User Reviews
export const getUserReviews = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_REVIEWS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/users/profile/reviews', config);

    dispatch({ type: GET_USER_REVIEWS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_USER_REVIEWS_FAIL,
      payload: error.response
        ? error.response.data
        : error.response.data.message,
    });
  }
};
