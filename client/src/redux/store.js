import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  restaurantCategoryListReducer,
  restaurantListReducer,
  restaurantReducer,
  restaurantReviewCreateReducer,
  restaurantReviewsReducer,
  restaurantTopListReducer,
} from './reducers/restaurantReducers';
import {
  userLoginReducer,
  userProfileReducer,
  userProfileUpdateReducer,
  userRegisterReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  // RESTAURANT
  restaurantList: restaurantListReducer,
  restaurantCategoryList: restaurantCategoryListReducer,
  restaurantTopList: restaurantTopListReducer,
  restaurantDetails: restaurantReducer,
  restaurantReviews: restaurantReviewsReducer,
  restaurantReviewCreate: restaurantReviewCreateReducer,
  // USER
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userProfileUpdate: userProfileUpdateReducer,
  // ADMIN
});

// Check if local storage has userInfo, if it does, convert to json object;
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Set initial userInfo
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
