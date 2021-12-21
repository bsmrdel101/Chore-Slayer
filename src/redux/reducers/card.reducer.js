const hand = (state = [], action) => {
    switch (action.type) {
        case 'GET_HAND':
            return action.payload;
        case 'SELECT_CARD':
            return state.splice(action.payload, 1);
        default:
            return state;
    }
  };

export default hand;
  