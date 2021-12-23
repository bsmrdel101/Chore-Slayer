const playerStatBlock = (state = {block: 0, health: 20, threat: 0, energy: 5}, action) => {
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
        case 'REMOVE_PLAYER_ENERGY':
            copyOfState = {...state};
            copyOfState.energy -= action.payload;
            return copyOfState;
        case 'RESET_PLAYER_ENERGY':
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

export default playerStatBlock;
  