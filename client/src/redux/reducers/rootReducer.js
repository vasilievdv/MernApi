import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import dataReducer from './dataReduser';

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  allusers: dataReducer,
});

export default rootReducer;
