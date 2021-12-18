import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import TaskCard from "../TaskCard/TaskCard";

function Tasks() {
    const dispatch = useDispatch();
    const taskReducer = useSelector((store) => store.taskReducer);

    useEffect(() => {
        fetchTasks();
    }, [])

    const fetchTasks = () => {
        dispatch({
            type: 'FETCH_TASKS'
        });
    }

    return (
        <>
            <h1>Chores</h1>
            <div className="task-page-container">
                {taskReducer.map((task) => {
                    return (
                        <div key={task.id} className='task-list'>
                            <TaskCard task={task}/>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Tasks;