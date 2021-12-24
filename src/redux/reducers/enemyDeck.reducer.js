const enemyDeck = (state = [], action) => {
    switch (action.type) {
        case 'GET_ENEMY_DECK':
            return action.payload;
        default:
            return state;
    }
  };

export default enemyDeck;
  