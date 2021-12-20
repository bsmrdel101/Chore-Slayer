const enemyBoard = (state = [], action) => {
    switch (action.type) {
        case 'GET_ENEMY_BOARD':
            return action.payload;
        default:
            return state;
    }
  };

export default enemyBoard;
  