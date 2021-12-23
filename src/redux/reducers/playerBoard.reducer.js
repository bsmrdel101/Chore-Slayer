const playerBoard = (state = [], action) => {
    switch (action.type) {
        case 'GET_PLAYER_BOARD':
            return action.payload;
        default:
            return state;
    }
  };

export default playerBoard;
  