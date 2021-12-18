import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Saga GET route
function* fetchTasks(action) {
    try {
      console.log(action);
      // Make an axios request to the server for tasks
      const response = yield axios({
        method: 'GET',
        url: '/api/plant'
      })
      // Update the tasks
      console.log(response.data);
      yield put({
        type: 'GET_TASKS',
        payload: response.data
      });
    } catch(err) {
      console.error('GET error: ', err);
    }
}


function* taskSaga() {
    yield takeLatest('FETCH_TASKS', fetchTasks);
  }
  
  export default taskSaga;