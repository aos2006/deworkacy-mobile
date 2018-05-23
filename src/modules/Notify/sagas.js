import { call, put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';

// The watcher: watch actions and coordinate worker tasks

function *watchSuccessReqs (action) {
    notification.success.open({
      message: 'Заявка успешно отправлена',
      description: '',
    });
  }

function * watchErrorReqs (action) {
  notification.error.open({
    message: 'Произошла ошибка',
    description: 'Пожалуйста сообщите нам об этом!!!',
  });
}

export default function * watchFetchRequests () {
  yield takeEvery(action => action.type.includes('request_success'), watchSuccessReqs);
  yield takeEvery(action => action.type.includes('request_fail'), watchErrorReqs);
}
