import { combineReducers } from 'redux';
import User from 'modules/User';

export default combineReducers({
  user: combineReducers({
    login: User.reducer.loginReducer,
    register: User.reducer.registerReducer,
  }),
});
