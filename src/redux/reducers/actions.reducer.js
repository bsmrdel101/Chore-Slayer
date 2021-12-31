const actions = (state = [], action) => {
    let copyOfState;
    switch (action.type) {
        case 'ADD_ACTION':
            copyOfState = [...state];
            if (copyOfState.length >= 5) {
                copyOfState = [];
            }
            copyOfState.push(action.payload);
            return copyOfState;
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
  