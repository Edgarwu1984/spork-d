import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  restaurantCategoryListReducer,
  restaurantListReducer,
  restaurantReducer,
  restaurantReviewsReducer,
  restaurantTopListReducer,
} from './reducers/restaurantReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const reducer = combineReducers({
  restaurantList: restaurantListReducer,
  restaurantCategoryList: restaurantCategoryListReducer,
  restaurantTopList: restaurantTopListReducer,
  restaurantDetails: restaurantReducer,
  restaurantReviews: restaurantReviewsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

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
