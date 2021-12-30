const actions = (state = [], action) => {
    let copyOfState;
    switch (action.type) {
        case 'ADD_ACTION':
            return action.payload;
        case 'CLEAR_ACTIONS':
            copyOfState = [...state];
            copyOfState = [];
            return copyOfState;
        case 'RESET_GAME':
            copyOfState = [...state];
            copyOfState = [];
            return copyOfState;
        default:
            return state;
    }
};

export default actions;
  