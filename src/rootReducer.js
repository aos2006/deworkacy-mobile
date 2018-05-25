import { combineReducers } from 'redux';
import Locations from 'modules/Locations';
import Calendar from 'modules/Calendar';

export default combineReducers({
  [Locations.types.NAME]: Locations.reducer,
  [Calendar.types.NAME]: Calendar.reducer,
});
