const playerBoard = (state = [], action) => {
    let copyOfState;
    switch (action.type) {
        case 'SUMMON_PLAYER_MINION':
            copyOfState = [...state];
            copyOfState.push(action.payload);
            return copyOfState;
        case 'ATTACK_PLAYER_MINION':
            let id = action.payload.id;
            copyOfState = [...state];
            copyOfState[id].health -= action.payload.attack;
            if (copyOfState[id].health <= 0) {
                copyOfState.splice(id, 1);
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
  