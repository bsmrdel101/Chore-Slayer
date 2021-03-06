const taskReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_TASKS':
            return action.payload;
        case 'TASK_COUNTER':
            return [{...state, tasksCompleted: action.payload}];
        default:
            return state;
    }
  };

export default taskReducer;
  