const rewardsReducer = (state = [], action) => {
    let copyOfState;
    switch (action.type) {
        case 'GET_REWARDS':
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
  };

export default rewardsReducer;
  