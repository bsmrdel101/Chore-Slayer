const rewardsReducer = (state = {coins: 0}, action) => {
    let copyOfState;
    switch (action.type) {
        case 'ADD_COINS':
            let copyOfState = {...state};
            console.log('action payload', action.payload);
            copyOfState.coins += action.payload;
            console.log(copyOfState);
            return copyOfState;
        default:
            return state;
    }
  };

export default rewardsReducer;
  