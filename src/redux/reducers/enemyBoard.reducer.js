const enemyBoard = (state = [], action) => {
    let copyOfState;
    switch (action.type) {
        case 'SUMMON_ENEMY_MINION':
            copyOfState = [...state];
            copyOfState.push(action.payload);
            return copyOfState;
        case 'ATTACK_ENEMY_MINION':
            let id = action.payload.id;
            copyOfState = [...state];
            copyOfState[id].health -= action.payload.attack;
            if (copyOfState[id].health <= 0) {
                copyOfState.splice(id, 1);
            }
            return copyOfState;
        case 'FILTER_BOARD':
            copyOfState = [...state];
            copyOfState.splice(state.length - 1, 1);
            return copyOfState;
        case 'RESET_GAME':
            copyOfState = [...state];
            copyOfState = [];
            return copyOfState;
        default:
            return state;
    }
  };

export default enemyBoard;
  