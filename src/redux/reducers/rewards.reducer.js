const rewardReducer = (state = {newCard: 0, statIncrease: 0}, action) => {
    let copyOfState;
    switch (action.type) {
        case 'GET_REWARDS':
            copyOfState = {...state};
            copyOfState.newCard = action.payload.newCard;
            copyOfState.statIncrease = action.payload.statIncrease;
            return copyOfState;
        default:
            return state;
    }
  };

export default rewardReducer;
  