import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Saga GET route
function* fetchDeck(action) {
    try {
      const response = yield axios({
        method: 'GET',
        url: '/api/deck'
      })
      yield put({
        type: 'GET_DECK',
        payload: response.data
      });
    } catch(err) {
      console.error('GET error: ', err);
    }
}

function* deckSaga() {
    yield takeLatest('FETCH_DECK', fetchDeck);
  }
  
export default deckSaga;
