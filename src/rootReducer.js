import { combineReducers } from 'redux';
import Locations from 'modules/Locations';

export default combineReducers({
  [Locations.types.NAME]: Locations.reducer,
});
