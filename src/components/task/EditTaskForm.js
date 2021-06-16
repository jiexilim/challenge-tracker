import React from 'react'
import EditSingleTask from "./EditSingleTask"
import EditRecurringTask from "./EditRecurringtask"
import { useServer } from "../../Server"
import axios from "axios"

const EditTaskForm = ({ popupState, task, onDelete, onEditSubmit }) => {
    const serverURL = useServer()

    const onSubmit = (task) => {
        onEditSubmit(task)
    }

    const deleteTask = async () => {
        popupState.close()
        axios.delete(serverURL + "/task/" + task._id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        onDelete(task._id)
    }

    return (
        <div className="task-form-wrapper">
            {task.type === "recurring" ?
                <EditRecurringTask task={task} onSubmit={onSubmit} onDelete={deleteTask} popupState={popupState} /> :
                <EditSingleTask task={task} onSubmit={onSubmit} onDelete={deleteTask} popupState={popupState} />}
        </div>

    )
}

export default EditTaskForm