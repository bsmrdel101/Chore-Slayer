import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Saga GET route
function* fetchHand(action) {
    try {
      const response = yield axios({
        method: 'GET',
        url: '/api/hand'
      })
      yield put({
        type: 'GET_HAND',
        payload: response.data
      });
    } catch(err) {
      console.error('GET error: ', err);
    }
}

function* taskSaga() {
    yield takeLatest('FETCH_HAND', fetchHand);
  }
  
  export default taskSaga;