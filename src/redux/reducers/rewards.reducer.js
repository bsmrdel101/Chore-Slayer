const rewardsReducer = (state = [], action) => {
    let copyOfState;
    switch (action.type) {
        case 'ADD_COINS':
            console.log('action payload', action.payload);
            return action.payload;
        default:
            return state;
    }
  };

export default rewardsReducer;
  