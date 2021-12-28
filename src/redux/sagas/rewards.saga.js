import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Saga PUT route
// function* progressReward(action) {
//     try {
//       // Make an axios request to the server
//       const response = yield axios({
//         method: 'PUT',
//         url: '/api/rewards',
//         data: action.payload
//       })
//       // Retrieve the reward value

//     } catch(err) {
//       console.error('GET error: ', err);
//     }
// }

// Retrieves the history
function* fetchReward(action) {
  try {
    const response = yield axios({
      method: 'GET',
      url: '/api/rewards'
    })
    console.log(response.data);
    yield put({
      type: 'GET_REWARDS',
      payload: response.data
    })
  } catch(err) {
    console.error('GET error: ', err);
  }
}

function* rewardsSaga() {
    yield takeLatest('FETCH_REWARD_PROGRESS', fetchReward);
    // yield takeLatest('PROGRESS_REWARD', progressReward);
}

export default rewardsSaga;