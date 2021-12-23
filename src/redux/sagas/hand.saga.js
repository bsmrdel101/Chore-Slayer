import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Saga GET route
// Retrieves the 5 random cards selected from the database
function* fetchHand(action) {
    try {
      const response = yield axios({
        method: 'GET',
        url: `/api/hand/${action.payload.card1}&${action.payload.card2}&${action.payload.card3}&${action.payload.card4}&${action.payload.card5}`
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
