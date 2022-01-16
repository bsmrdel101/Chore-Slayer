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

function* gamesWon(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/stats'
        })

        const total = response.data.games_won + 1;
        yield axios({
            method: 'PUT',
            url: '/api/stats',
            data: {
                games_won: total,
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
        yield put({
            type: 'FETCH_STATS'
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}

function* gamesLost(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/stats'
        })

        const total = response.data.games_lost + 1;
        yield axios({
            method: 'PUT',
            url: '/api/stats',
            data: {
                games_won: response.data.games_won,
                games_lost: total,
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
        yield put({
            type: 'FETCH_STATS'
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}

function* totalGames(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/stats'
        })

        const total = response.data.total_games + 1;
        yield axios({
            method: 'PUT',
            url: '/api/stats',
            data: {
                games_won: response.data.games_won,
                games_lost: response.data.games_lost,
                total_games: total,
                cards_played: response.data.cards_played,
                total_damage: response.data.total_damage,
                total_block: response.data.total_block,
                minions_slain: response.data.minions_slain,
                times_surrendered: response.data.times_surrendered,
                highest_threat: response.data.highest_threat,
                highest_block: response.data.highest_block
            }
        })
        yield put({
            type: 'FETCH_STATS'
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}

function* cardsPlayed(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/stats'
        })

        const total = response.data.cards_played + 1;
        yield axios({
            method: 'PUT',
            url: '/api/stats',
            data: {
                games_won: response.data.games_won,
                games_lost: response.data.games_lost,
                total_games: response.data.total_games,
                cards_played: total,
                total_damage: response.data.total_damage,
                total_block: response.data.total_block,
                minions_slain: response.data.minions_slain,
                times_surrendered: response.data.times_surrendered,
                highest_threat: response.data.highest_threat,
                highest_block: response.data.highest_block
            }
        })
        yield put({
            type: 'FETCH_STATS'
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}

function* totalDamage(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/stats'
        })

        const total = response.data.total_damage + action.payload;
        yield axios({
            method: 'PUT',
            url: '/api/stats',
            data: {
                games_won: response.data.games_won,
                games_lost: response.data.games_lost,
                total_games: response.data.total_games,
                cards_played: response.data.cards_played,
                total_damage: total,
                total_block: response.data.total_block,
                minions_slain: response.data.minions_slain,
                times_surrendered: response.data.times_surrendered,
                highest_threat: response.data.highest_threat,
                highest_block: response.data.highest_block
            }
        })
        yield put({
            type: 'FETCH_STATS'
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}

function* totalBlock(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/stats'
        })

        const total = response.data.total_block + action.payload;
        yield axios({
            method: 'PUT',
            url: '/api/stats',
            data: {
                games_won: response.data.games_won,
                games_lost: response.data.games_lost,
                total_games: response.data.total_games,
                cards_played: response.data.cards_played,
                total_damage: response.data.total_damage,
                total_block: total,
                minions_slain: response.data.minions_slain,
                times_surrendered: response.data.times_surrendered,
                highest_threat: response.data.highest_threat,
                highest_block: response.data.highest_block
            }
        })
        yield put({
            type: 'FETCH_STATS'
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}

function* minionsSlain(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/stats'
        })

        const total = response.data.minions_slain + 1;
        yield axios({
            method: 'PUT',
            url: '/api/stats',
            data: {
                games_won: response.data.games_won,
                games_lost: response.data.games_lost,
                total_games: response.data.total_games,
                cards_played: response.data.cards_played,
                total_damage: response.data.total_damage,
                total_block: response.data.total_block,
                minions_slain: total,
                times_surrendered: response.data.times_surrendered,
                highest_threat: response.data.highest_threat,
                highest_block: response.data.highest_block
            }
        })
        yield put({
            type: 'FETCH_STATS'
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}

function* timesSurrendered(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/stats'
        })

        const total = response.data.times_surrendered + 1;
        yield axios({
            method: 'PUT',
            url: '/api/stats',
            data: {
                games_won: response.data.games_won,
                games_lost: response.data.games_lost,
                total_games: response.data.total_games,
                cards_played: response.data.cards_played,
                total_damage: response.data.total_damage,
                total_block: response.data.total_block,
                minions_slain: response.data.minions_slain,
                times_surrendered: total,
                highest_threat: response.data.highest_threat,
                highest_block: response.data.highest_block
            }
        })
        yield put({
            type: 'FETCH_STATS'
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}


function* highestThreat(action) {
    try {
        let total;
        const response = yield axios({
            method: 'GET',
            url: '/api/stats'
        })

        if (action.payload > response.data.highest_threat) {
            total = action.payload;
        } else {
            total = response.data.highest_threat;
        }
        yield axios({
            method: 'PUT',
            url: '/api/stats',
            data: {
                games_won: response.data.games_won,
                games_lost: response.data.games_lost,
                total_games: response.data.total_games,
                cards_played: response.data.cards_played,
                total_damage: response.data.total_damage,
                total_block: response.data.total_block,
                minions_slain: response.data.minions_slain,
                times_surrendered: response.data.times_surrendered,
                highest_threat: total,
                highest_block: response.data.highest_block
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
    yield takeLatest('GAMES_WON', gamesWon);
    yield takeLatest('GAMES_LOST', gamesLost);
    yield takeLatest('TOTAL_GAMES', totalGames);
    yield takeLatest('CARDS_PLAYED', cardsPlayed);
    yield takeLatest('TOTAL_DAMAGE', totalDamage);
    yield takeLatest('TOTAL_BLOCK', totalBlock);
    yield takeLatest('MINIONS_SLAIN', minionsSlain);
    yield takeLatest('TIMES_SURRENDERED', timesSurrendered);
    yield takeLatest('HIGHEST_THREAT', highestThreat);
}

export default statsSaga;