import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer'

// invokes every reducers and return a state
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});