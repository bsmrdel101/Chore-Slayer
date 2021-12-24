const enemyHand = (state = [], action) => {
    switch (action.type) {
        case 'GET_ENEMY_HAND':
            return action.payload;
        case 'SELECT_ENEMY_CARD':
            let copyOfState = [...state];
            copyOfState.splice(action.payload, 1);
            return copyOfState;
        default:
            return state;
    }
  };

export default enemyHand;
  