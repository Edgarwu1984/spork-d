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

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { loading: true, users: [] };
    case GET_USERS_SUCCESS:
      return { loading: false, users: action.payload };
    case GET_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { loading: true, user: {} };
    case GET_USER_SUCCESS:
      return { loading: false, user: action.payload };
    case GET_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return { loading: true };
    case UPDATE_USER_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case UPDATE_USER_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_USER_RESET:
      return {};
    default:
      return state;
  }
};
