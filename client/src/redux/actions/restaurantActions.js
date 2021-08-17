import axios from 'axios';
import {
  GET_RESTAURANT_FAIL,
  GET_RESTAURANT_LIST_FAIL,
  GET_RESTAURANT_LIST_REQUEST,
  GET_RESTAURANT_LIST_SUCCESS,
  GET_RESTAURANT_REQUEST,
  GET_RESTAURANT_SUCCESS,
} from '../constants/restaurantConstants';

export const listRestaurant = () => async dispatch => {
  try {
    dispatch({ type: GET_RESTAURANT_LIST_REQUEST });
    const { data } = await axios.get('/api/restaurants');

    dispatch({ type: GET_RESTAURANT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_RESTAURANT_LIST_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getRestaurantDetails = id => async dispatch => {
  try {
    dispatch({ type: GET_RESTAURANT_REQUEST });
    const { data } = await axios.get(`/api/restaurants/${id}`);

    dispatch({ type: GET_RESTAURANT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_RESTAURANT_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
