import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

/**** AXIOS ROUTES ****/

function* fetchStats(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/stats'
        })
        yield put({
            type: 'SET_STATS',
            payload: {
                games_won: response.data.games_won,
                games_lost: response.data.games_lost,
                total_games: response.data.total_games,
                cards_played: response.data.cards_played,
                total_damage: response.data.total_damage,
                total_block: response.data.total_block,
                minions_slain: response.data.minions_slain,
                times_surrendered: response.data.times_surrendered,
                highest_threat: response.data.highest_threat,
                highest_block: response.data.highest_block
            }
        })
    } catch(err) {
        console.error('GET error: ', err);
    }
}

function* checkUser(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: `/api/stats/1`
        })
        // Checks if the user is new
        // If true, then insert a row for them in the stats table 
        if (response.data.new_user === true) {
            yield put({
                type: 'INITIALIZE_STATS'
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
            url: '/api/stats'
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
            url: '/api/stats/1',
        })
    } catch(err) {
        console.error('GET error: ', err);
    }
}


/**** STAT HANDLERS ****/

function* totalGames(action) {
    try {
        const total = action.payload.total_games + 1;
        yield axios({
            method: 'PUT',
            url: '/api/stats',
            data: {
                games_won: action.payload.games_won,
                games_lost: action.payload.games_lost,
                total_games: total,
                cards_played: action.payload.cards_played,
                total_damage: action.payload.total_damage,
                total_block: action.payload.total_block,
                minions_slain: action.payload.minions_slain,
                times_surrendered: action.payload.times_surrendered,
                highest_threat: action.payload.highest_threat,
                highest_block: action.payload.highest_block
            }
        })
        yield put({
            type: 'FETCH_STATS'
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}


function* statsSaga() {
    // axios routes
    yield takeLatest('FETCH_STATS', fetchStats);
    yield takeLatest('INITIALIZE_STATS', initializeStats);
    yield takeLatest('CHECK_USER', checkUser);
    yield takeLatest('NEW_USER', newUser);
    // stat handlers
    // yield takeLatest('GAMES_WON', gamesWon);
    // yield takeLatest('GAMES_LOST', gamesLost);
    yield takeLatest('TOTAL_GAMES', totalGames);
}

export default statsSaga;