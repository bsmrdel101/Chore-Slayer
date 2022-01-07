import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchStats(action) {
    try {
      const response = yield axios({
        method: 'GET',
        url: '/api/stats'
      })
      console.log(response.data);
    } catch(err) {
      console.error('GET error: ', err);
    }
}

function* checkUser(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: `/api/stats/${action.payload}`
        })
        console.log(response.data);
        // Checks if the user is new
        // If true, then insert a row for them in the stats table 
        if (response.data.new_user === true) {
            yield put({
                type: 'INITIALIZE_STATS',
                payload: 1
            });
        }
    } catch(err) {
        console.error('GET error: ', err);
    }
}

function* initializeStats(action) {
    try {
        yield axios({
            method: 'POST',
            url: '/api/stats',
            data: action.payload
        })
        // Sets new_user to false
        yield put({
            type: 'NEW_USER'
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}

function* newUser(action) {
    try {
        yield axios({
            method: 'PUT',
            url: '/api/stats',
        })
    } catch(err) {
        console.error('GET error: ', err);
    }
}



function* statsSaga() {
    yield takeLatest('FETCH_STATS', fetchStats);
    yield takeLatest('INITIALIZE_STATS', initializeStats);
    yield takeLatest('CHECK_USER', checkUser);
    yield takeLatest('NEW_USER', newUser);
}

export default statsSaga;