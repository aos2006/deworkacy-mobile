export { default as RegisterForm } from './components/Register';
export { default as LoginForm } from './components/Login';
import * as reducer from './reducer';
import * as types from './actionTypes';
import saga from './sagas';

export default { reducer, types, saga };
