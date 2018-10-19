import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';

// invokes every reducers and return a state
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
});