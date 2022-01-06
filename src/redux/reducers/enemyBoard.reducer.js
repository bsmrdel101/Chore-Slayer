const enemyBoard = (state = [], action) => {
    let copyOfState;
    switch (action.type) {
        case 'SUMMON_ENEMY_MINION':
            copyOfState = [...state];
            copyOfState.push(action.payload);
            console.log(copyOfState);
            return copyOfState;
        case 'ATTACK_ENEMY_MINION':
            let id = action.payload.id;
            copyOfState = [...state];
            if (copyOfState[id] === undefined) {
                id = 0;
            }
            copyOfState[id].health -= action.payload.attack;
            if (copyOfState[id].health <= 0) {
                copyOfState.splice(id, 1);
            }
            return copyOfState;
        case 'DRAGON_SACRIFICE_ENEMY':
            copyOfState = [...state];
            copyOfState.pop();
            return copyOfState;
        case 'RESTART_ATTACK':
            copyOfState = [...state];
            copyOfState = [];
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
  