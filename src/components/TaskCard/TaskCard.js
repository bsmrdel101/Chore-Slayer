
function TaskCard({task}) {
    return (
        <div>
            <p>{task.name}</p>
            <p>{task.description}</p>
        </div>
    );
}

export default TaskCard;