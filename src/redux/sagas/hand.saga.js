import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Saga GET route
function* fetchHand(action) {
    try {
      const response = yield axios({
        method: 'GET',
        url: `/api/hand/${action.payload}`
      })
      yield put({
        type: 'GET_HAND',
        payload: response.data
      });
    } catch(err) {
      console.error('GET error: ', err);
    }
}

function* handSaga() {
    yield takeLatest('FETCH_HAND', fetchHand);
  }
  
export default handSaga;
