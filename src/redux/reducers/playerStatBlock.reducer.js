const playerStatBlock = (state = {block: 0, health: 20, threat: 0, energy: 500, canAttack: false, element: {}}, action) => {
    let copyOfState;
    switch (action.type) {
        case 'ADD_PLAYER_BLOCK':
            copyOfState = {...state};
            copyOfState.block += action.payload;
            return copyOfState;
        case 'SWAP_PLAYER_BLOCK':
            copyOfState = {...state};
            console.log('TODO: add swap block mechanic');
            return copyOfState;
        case 'ADD_PLAYER_THREAT':
            copyOfState = {...state};
            copyOfState.threat += action.payload;
            return copyOfState;
        case 'PLAYER_CAN_ATTACK':
            copyOfState = {...state};
            copyOfState.canAttack = true
            return copyOfState;
        case 'REMOVE_PLAYER_ENERGY':
            copyOfState = {...state};
            copyOfState.energy -= action.payload;
            return copyOfState;
        case 'ELEMENT':
            copyOfState = {...state};
            copyOfState.element = action.payload;
            return copyOfState;
        case 'RESET_PLAYER_ENERGY':
            copyOfState = {...state};
            copyOfState.energy = 500;
            // Set canAttack back to false at end of turn
            copyOfState.canAttack = false;
            return copyOfState;
        case 'RESET_GAME':
            copyOfState = {...state};
            copyOfState = {block: 0, health: 20, threat: 0, energy: 5, canAttack: false};
            return copyOfState;
        default:
            return state;
    }
  };

export default playerStatBlock;
  