const playerBoard = (state = [], action) => {
    let copyOfState;
    switch (action.type) {
        case 'SUMMON_PLAYER_MINION':
            copyOfState = [...state];
            copyOfState.push(action.payload);
            return copyOfState;
        case 'RESET_GAME':
            copyOfState = [...state];
            copyOfState = [];
            return copyOfState;
        default:
            return state;
    }
  };

export default playerBoard;
  