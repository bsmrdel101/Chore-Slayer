const statsReducer = (state = {games_won: 0, games_lost: 0, total_games: 0, cards_played: 0, total_damage: 0, total_block: 0, minions_slain: 0, times_surrendered: 0, highest_threat: 0, highest_block: 0}, action) => {
    let copyOfState;
    switch (action.type) {
        case 'GAMES_WON':
            copyOfState = {...state};
            copyOfState.games_won = action.payload;
            return copyOfState;
        case 'GAMES_LOST':
            copyOfState = {...state};
            copyOfState.games_lost = action.payload;
            return copyOfState;
        case 'TOTAL_GAMES':
            copyOfState = {...state};
            copyOfState.total_games = action.payload;
            return copyOfState;
        default:
            return state;
    }
  };

export default statsReducer;
  