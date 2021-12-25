const enemyStatBlock = (state = {block: 0, health: 20, threat: 0, energy: 5}, action) => {
    let copyOfState;
    switch (action.type) {
        case 'ADD_ENEMY_BLOCK':
            copyOfState = {...state};
            copyOfState.block += action.payload;
            return copyOfState;
        case 'SWAP_ENEMY_BLOCK':
            copyOfState = {...state};
            console.log('TODO: add swap block mechanic');
            return copyOfState;
        case 'ADD_ENEMY_THREAT':
            copyOfState = {...state};
            copyOfState.threat += action.payload;
            return copyOfState;
        case 'DEAL_ENEMY_DAMAGE':
            copyOfState = {...state};
            copyOfState.health -= action.payload;
            return copyOfState;
        case 'REMOVE_ENEMY_ENERGY':
            copyOfState = {...state};
            copyOfState.energy -= action.payload;
            return copyOfState;
        case 'RESET_ENEMY_ENERGY':
            copyOfState = {...state};
            copyOfState.energy = 5;
            return copyOfState;
        case 'RESET_GAME':
            copyOfState = {...state};
            copyOfState = {block: 0, health: 20, threat: 0, energy: 5};
            return copyOfState;
        default:
            return state;
    }
  };

export default enemyStatBlock;
  