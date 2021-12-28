const taskHistoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_HISTORY':
            return action.payload;
        case 'CLEAR_HISTORY':
            return [];
        default:
            return state;
    }
  };

export default taskHistoryReducer;
  