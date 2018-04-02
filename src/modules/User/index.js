export { default as RegisterForm } from './components/Register';
import reducer from './reducer';
import * as types from './actionTypes';
import saga from './sagas';

export default { reducer, types, saga };
