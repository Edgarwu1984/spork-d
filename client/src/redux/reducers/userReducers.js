import {
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_RESET,
  UPDATE_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_RESET,
  GET_USER_REVIEWS_REQUEST,
  GET_USER_REVIEWS_SUCCESS,
  GET_USER_REVIEWS_FAIL,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { loading: true };
    case LOGIN_USER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case LOGIN_USER_FAIL:
      return { loading: false, error: action.payload };
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { loading: true };
    case REGISTER_USER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case REGISTER_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_REQUEST:
      return { loading: true, ...state };
    case GET_USER_PROFILE_SUCCESS:
      return { loading: false, user: action.payload };
    case GET_USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case GET_USER_PROFILE_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE_REQUEST:
      return { loading: true };
    case UPDATE_USER_PROFILE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case UPDATE_USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_USER_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case GET_USER_REVIEWS_REQUEST:
      return { loading: true, reviews: [] };
    case GET_USER_REVIEWS_SUCCESS:
      return { loading: false, reviews: action.payload };
    case GET_USER_REVIEWS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
