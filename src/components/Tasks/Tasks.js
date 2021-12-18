import { useDispatch } from "react-redux";
import { useEffect } from "react";

function Tasks() {
    const dispatch = useDispatch();

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
        </>
    );
}

export default Tasks;