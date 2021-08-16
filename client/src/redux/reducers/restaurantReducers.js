import {
  GET_RESTAURANT_LIST_FAIL,
  GET_RESTAURANT_LIST_REQUEST,
  GET_RESTAURANT_LIST_SUCCESS,
} from '../constants/restaurantConstants';

export const restaurantListReducer = (state = { restaurants: [] }, action) => {
  switch (action.type) {
    case GET_RESTAURANT_LIST_REQUEST:
      return { loading: true, restaurants: [] };
    case GET_RESTAURANT_LIST_SUCCESS:
      return { loading: false, restaurants: action.payload };
    case GET_RESTAURANT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
