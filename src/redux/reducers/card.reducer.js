const hand = (state = [], action) => {
    switch (action.type) {
        case 'GET_HAND':
            return action.payload;
        default:
            return state;
    }
  };

export default hand;
  