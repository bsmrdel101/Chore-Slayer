const playerBoard = (state = [], action) => {
    let copyOfState;
    switch (action.type) {
        case 'SUMMON_PLAYER_MINION':
            copyOfState = [...state];
            copyOfState.push(action.payload);
            return copyOfState;
        case 'ATTACK_PLAYER_MINION':
            copyOfState = [...state];
            if (state.length > 0) {
                copyOfState[0].health -= action.payload.attack;
            }
            if (copyOfState[0].health <= 0) {
                copyOfState.splice(0, 1);
            }
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
  