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
export const restaurantCategoryListReducer = (
  state = { restaurants: [] },
  action
) => {
  switch (action.type) {
    case GET_RESTAURANT_BY_CATEGORY_REQUEST:
      return { loading: true, restaurants: [] };
    case GET_RESTAURANT_BY_CATEGORY_SUCCESS:
      return { loading: false, restaurants: action.payload };
    case GET_RESTAURANT_BY_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const restaurantTopListReducer = (
  state = { restaurants: [] },
  action
) => {
  switch (action.type) {
    case GET_TOP_RESTAURANT_REQUEST:
      return { loading: true, restaurants: [] };
    case GET_TOP_RESTAURANT_SUCCESS:
      return { loading: false, restaurants: action.payload };
    case GET_TOP_RESTAURANT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const restaurantReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case GET_RESTAURANT_REVIEWS_REQUEST:
      return { loading: true, reviews: [] };
    case GET_RESTAURANT_REVIEWS_SUCCESS:
      return { loading: false, reviews: action.payload };
    case GET_RESTAURANT_REVIEWS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const restaurantReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_RESTAURANT_REVIEWS_REQUEST:
      return { loading: true };
    case CREATE_RESTAURANT_REVIEWS_SUCCESS:
      return { loading: false, success: true };
    case CREATE_RESTAURANT_REVIEWS_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_RESTAURANT_REVIEWS_RESET:
      return {};
    default:
      return state;
  }
};

export const restaurantReducer = (state = { restaurant: {} }, action) => {
  switch (action.type) {
    case GET_RESTAURANT_REQUEST:
      return { loading: true, restaurant: {} };
    case GET_RESTAURANT_SUCCESS:
      return { loading: false, restaurant: action.payload };
    case GET_RESTAURANT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
