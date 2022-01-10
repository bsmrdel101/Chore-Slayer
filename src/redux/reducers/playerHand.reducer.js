const hand = (state = [], action) => {
    let copyOfState;
    switch (action.type) {
        case 'GET_HAND':
            return action.payload;
        case 'SELECT_CARD':
            copyOfState = [...state];
            copyOfState.splice(action.payload, 1);
            return copyOfState;
        default:
            return state;
    }
  };

export default hand;
  