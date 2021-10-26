import axios from 'axios';
import { GET_USER_REVIEWS_RESET } from 'redux/constants/userConstants';
import {
  CREATE_RESTAURANT_REVIEWS_FAIL,
  CREATE_RESTAURANT_REVIEWS_REQUEST,
  CREATE_RESTAURANT_REVIEWS_RESET,
  CREATE_RESTAURANT_REVIEWS_SUCCESS,
  GET_RESTAURANT_BY_CATEGORY_FAIL,
  GET_RESTAURANT_BY_CATEGORY_REQUEST,
  GET_RESTAURANT_BY_CATEGORY_SUCCESS,
  GET_RESTAURANT_FAIL,
  GET_RESTAURANT_LIST_FAIL,
  GET_RESTAURANT_LIST_REQUEST,
  GET_RESTAURANT_LIST_SUCCESS,
  GET_RESTAURANT_REQUEST,
  GET_RESTAURANT_REVIEWS_FAIL,
  GET_RESTAURANT_REVIEWS_REQUEST,
  GET_RESTAURANT_REVIEWS_SUCCESS,
  GET_RESTAURANT_SUCCESS,
  GET_TOP_RESTAURANT_FAIL,
  GET_TOP_RESTAURANT_REQUEST,
  GET_TOP_RESTAURANT_SUCCESS,
} from '../constants/restaurantConstants';

export const listRestaurant =
  (keyword = '') =>
  async dispatch => {
    try {
      dispatch({ type: GET_RESTAURANT_LIST_REQUEST });
      const { data } = await axios.get(`/api/restaurants?search=${keyword}`);

      dispatch({ type: GET_RESTAURANT_LIST_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({
        type: GET_RESTAURANT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listTopRestaurant = () => async dispatch => {
  try {
    dispatch({ type: GET_TOP_RESTAURANT_REQUEST });
    const { data } = await axios.get('/api/restaurants/top');

    dispatch({ type: GET_TOP_RESTAURANT_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_TOP_RESTAURANT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listRestaurantByCategory = category => async dispatch => {
  try {
    dispatch({ type: GET_RESTAURANT_BY_CATEGORY_REQUEST });
    const { data } = await axios.get(`/api/restaurants/${category}`);

    dispatch({ type: GET_RESTAURANT_BY_CATEGORY_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_RESTAURANT_BY_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listRestaurantReviews = (category, id) => async dispatch => {
  try {
    dispatch({ type: GET_RESTAURANT_REVIEWS_REQUEST });
    const { data } = await axios.get(
      `/api/restaurants/${category}/${id}/reviews`
    );

    dispatch({ type: GET_RESTAURANT_REVIEWS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_RESTAURANT_REVIEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createRestaurantReview =
  (category, id, review) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      dispatch({ type: CREATE_RESTAURANT_REVIEWS_REQUEST });
      await axios.post(
        `/api/restaurants/${category}/${id}/reviews`,
        review,
        config
      );

      dispatch({ type: CREATE_RESTAURANT_REVIEWS_SUCCESS });
      dispatch({ type: CREATE_RESTAURANT_REVIEWS_RESET });
    } catch (error) {
      dispatch({
        type: CREATE_RESTAURANT_REVIEWS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getRestaurantDetails = (category, id) => async dispatch => {
  try {
    dispatch({ type: GET_RESTAURANT_REQUEST });
    const { data } = await axios.get(`/api/restaurants/${category}/${id}`);

    dispatch({ type: GET_RESTAURANT_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_RESTAURANT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
