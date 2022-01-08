const statsReducer = (state = {games_won: 0, games_lost: 0, total_games: 0, cards_played: 0, total_damage: 0, total_block: 0, minions_slain: 0, times_surrendered: 0, highest_threat: 0, highest_block: 0}, action) => {
    let copyOfState;
    switch (action.type) {
        case 'SET_STATS':
            console.log(action.payload);
            copyOfState = {...state};
            copyOfState.games_won = action.payload.games_won;
            copyOfState.games_lost = action.payload.games_lost; 
            copyOfState.total_games = action.payload.total_games;
            copyOfState.cards_played = action.payload.cards_played;
            copyOfState.total_damage = action.payload.total_damage;
            copyOfState.total_block = action.payload.total_block;
            copyOfState.minions_slain = action.payload.minions_slain;
            copyOfState.times_surrendered = action.payload.times_surrendered;
            copyOfState.highest_threat = action.payload.highest_threat;
            copyOfState.highest_block = action.payload.highest_block;
            return copyOfState;
        default:
            return state;
    }
  };

export default statsReducer;
  