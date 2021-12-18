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
            {taskReducer.map((task) => {
                return <TaskCard key={task.id} task={task}/>
            })}
        </>
    );
}

export default Tasks;