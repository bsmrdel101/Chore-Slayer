const rewardsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_COINS':
            return action.payload;
        default:
            return state;
    }
  };

export default rewardsReducer;
  