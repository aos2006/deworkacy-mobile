import { combineReducers } from 'redux';
import User from 'modules/User';

export default combineReducers({
  user: User.reducer,
});
