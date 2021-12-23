const statBlock = (state = {block: 0, hp: 20, threat: 0, energy: 5}, action) => {
    let copyOfState;
    switch (action.type) {
        case 'ADD_BLOCK':
            copyOfState = {...state};
            copyOfState.block += action.payload;
            return copyOfState;
        case 'SWAP_BLOCK':
            copyOfState = {...state};
            console.log('TODO: add swap block mechanic');
            return copyOfState;
        default:
            return state;
    }
  };

export default statBlock;
  