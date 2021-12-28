const rewardsReducer = (state = {newCard: 0}, action) => {
    let copyOfState;
    switch (action.type) {
        case 'GET_REWARDS':
            copyOfState = {...state};
            copyOfState.newCard = action.payload;
            return copyOfState;
        default:
            return state;
    }
  };

export default rewardsReducer;
  