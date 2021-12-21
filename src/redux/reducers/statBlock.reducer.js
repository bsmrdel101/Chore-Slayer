const statBlock = (state = {block: 0, hp: 20, threat: 0}, action) => {
    switch (action.type) {
        case 'ADD_BLOCK':
            let copyOfState = {...state};
            copyOfState.block += action.payload;
            console.log(copyOfState.block);
            return copyOfState;
        default:
            return state;
    }
  };

export default statBlock;
  