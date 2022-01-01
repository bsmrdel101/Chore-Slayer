import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Saga PUT route
function* rewardCoins(action) {
    try {
      // Make an axios request to the server
      const response = yield axios({
        method: 'PUT',
        url: '/api/rewards',
        data: {coins: action.payload}
      })
      // Update coin count
      yield put({
        type: 'FETCH_COINS'
      })
    } catch(err) {
      console.error('GET error: ', err);
    }
}

// Retrieves the history
function* fetchCoins(action) {
  try {
    const response = yield axios({
      method: 'GET',
      url: '/api/rewards'
    })
    console.log('RESPONSE!!!!!!', response.data[0].coins);
    yield put({
      type: 'ADD_COINS',
      payload: response.data[0].coins
    });
  } catch(err) {
    console.error('GET error: ', err);
  }
}

function* rewardsSaga() {
    yield takeLatest('FETCH_COINS', fetchCoins);
    yield takeLatest('REWARD_COINS', rewardCoins);
}

export default rewardsSaga;