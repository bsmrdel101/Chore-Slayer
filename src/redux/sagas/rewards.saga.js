import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max + 1);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


// Saga PUT route
function* rewardCoins(action) {
    try {

      // Make an axios request to the server
      const response = yield axios({
        method: 'PUT',
        url: '/api/rewards',
        data: {coins: action.payload}
      })
      // Add the coin amount to the reward reducer
      yield put({
        type: 'ADD_COINS',
        payload: action.payload
      });
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
    const num = getRandomInt(50, 150);
    let coins = num + response.data[0].coins;
    console.log('num', num);
    console.log('coins', coins);
    yield put({
      type: 'REWARD_COINS',
      payload: coins
    })
  } catch(err) {
    console.error('GET error: ', err);
  }
}

function* rewardsSaga() {
    yield takeLatest('FETCH_COINS', fetchCoins);
    yield takeLatest('REWARD_COINS', rewardCoins);
}

export default rewardsSaga;