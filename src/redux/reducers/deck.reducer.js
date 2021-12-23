const deckReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_DECK':
            return action.payload;
        default:
            return state;
    }
  };

export default deckReducer;
  