import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Swal from 'sweetalert2';

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

// Retrieves the history and edits
function* fetchCoins(action) {
  try {
    const response = yield axios({
      method: 'GET',
      url: '/api/rewards'
    })
    const num = getRandomInt(50, 150);
    let coins = num + response.data[0].coins;

    // Show the user how much coins they earned
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })      
    Toast.fire({
        icon: 'info',
        title: `You have earned ${num} coins`
    })

    yield put({
      type: 'REWARD_COINS',
      payload: coins
    })
  } catch(err) {
    console.error('GET error: ', err);
  }
}

// Just retrieves the history
function* getReward(action) {
  try {
    const response = yield axios({
      method: 'GET',
      url: '/api/rewards'
    })
    // Add the coin amount to the reward reducer
    yield put({
      type: 'ADD_COINS',
      payload: response.data[0].coins
    });
  } catch(err) {
    console.error('GET error: ', err);
  }
}

// Subtracts users coin amount from the card price
function* payCoins(action) {
  try {
    let total = action.payload.coins - action.payload.price;
    const response = yield axios({
      method: 'PUT',
      url: `/api/rewards/${action.payload.id}`,
      data: {coins: total}
    })
    // Update the reward reducer
    yield put({
      type: 'GET_REWARD',
      payload: response.data[0].coins
    });
  } catch(err) {
    console.error('GET error: ', err);
  }
}

function* refund(action) {
  try {
    console.log(action.payload.coins);
    console.log(action.payload.amount);
    let total = action.payload.coins + action.payload.amount;
    const response = yield axios({
      method: 'PUT',
      url: `/api/rewards/`,
      data: {coins: total}
    })
    // Update the reward reducer
    yield put({
      type: 'GET_REWARD',
      payload: response.data[0].coins
    });
  } catch(err) {
    console.error('GET error: ', err);
  }
}

function* rewardsSaga() {
    yield takeLatest('FETCH_COINS', fetchCoins);
    yield takeLatest('REWARD_COINS', rewardCoins);
    yield takeLatest('GET_REWARD', getReward);
    yield takeLatest('PAY_COINS', payCoins);
    yield takeLatest('REFUND', refund);
}

export default rewardsSaga;