import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Saga GET route
function* fetchTasks(action) {
    try {
      // Make an axios request to the server for tasks
      const response = yield axios({
        method: 'GET',
        url: '/api/tasks'
      })
      // Update the tasks
      yield put({
        type: 'GET_TASKS',
        payload: response.data
      });
    } catch(err) {
      console.error('GET error: ', err);
    }
}

// Saga POST route
function* addTask(action) {
    try {
        // Axios POST /api/tasks as an object
        const response = yield axios({
            method: 'POST',
            url: '/api/tasks',
            data: action.payload
        })
        // Update the tasks
        yield put({
          type: 'FETCH_TASKS'
        })
    } catch(err) {
      console.error(err);
    }
}

// Saga DELETE route
function* deleteTask(action) {
    try {
      // Make an axios request to the server
      const response = yield axios({
        method: 'DELETE',
        url: `/api/tasks/${action.payload}`
      })
      // Update the tasks
      yield put({
        type: 'FETCH_TASKS'
      });
    } catch(err) {
      console.error('GET error: ', err);
    }
}

// Saga PUT route
function* editTask(action) {
    try {
      // Make an axios request to the server
      const response = yield axios({
        method: 'PUT',
        url: `/api/tasks/${action.payload.id}`,
        data: action.payload
      })
      // Update the tasks
      yield put({
        type: 'FETCH_TASKS'
      });
    } catch(err) {
      console.error('GET error: ', err);
    }
}

// sends dispatch to taskHistory reducer
function* storeTask(action) {
  try {
    const response = yield axios({
      method: 'POST',
      url: '/api/history',
      data: action.payload
    })
    yield put({
      type: 'FETCH_HISTORY'
    })
  } catch(err) {
    console.error('GET error: ', err);
  }
}

// Retrieves the history
function* fetchHistory(action) {
  try {
    const response = yield axios({
      method: 'GET',
      url: '/api/history'
    })
    yield put({
      type: 'GET_HISTORY',
      payload: response.data
    })
  } catch(err) {
    console.error('GET error: ', err);
  }
}

function* taskSaga() {
    yield takeLatest('FETCH_TASKS', fetchTasks);
    yield takeLatest('ADD_TASK', addTask);
    yield takeLatest('DELETE_TASK', deleteTask);
    yield takeLatest('EDIT_TASK', editTask);
    yield takeLatest('FETCH_HISTORY', fetchHistory);
    yield takeLatest('STORE_TASK', storeTask);
  }
  
  export default taskSaga;