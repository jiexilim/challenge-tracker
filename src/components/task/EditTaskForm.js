import React from 'react'
import EditSingleTask from "./EditSingleTask"
import EditRecurringTask from "./EditRecurringtask"
import { useServer } from "../../Server"
import axios from "axios"

const EditTaskForm = ({ popupState, task }) => {
    const serverURL = useServer()
    const taskId = task._id

    const onSubmit = (task) => {
        axios.post(serverURL + `/task/update/${taskId}`, task)
            .then(res => console.log(res.data))
    }

    const deleteTask = async () => {
        popupState.close()
        axios.delete(serverURL + "/task/" + task._id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
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