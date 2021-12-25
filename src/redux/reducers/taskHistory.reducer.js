const taskHistoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_TASK':
            return action.payload;
        default:
            return state;
    }
  };

export default taskHistoryReducer;
  