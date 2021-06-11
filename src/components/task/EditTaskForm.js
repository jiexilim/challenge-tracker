import React, { useState } from 'react'
import EditSingleTask from "./EditSingleTask"
import EditRecurringTask from "./EditRecurringtask"
import { useServer } from "../../Server"
import axios from "axios"

const EditTask = ({ task, popupState }) => {
    const serverURL = useServer();
   
	const onSubmit = (task) => {
        axios.post(serverURL + "/target/edit", task)
            .then(res => console.log(res.data));
    };

    const deleteTask = async (id) => {
        axios.delete(serverURL + "/target/delete",
            { data: { targetId: id } })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    return (

        <form onSubmit={onSubmit} className="form-body"
            style={{
                display: "block", zIndex: 9, background: "white",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                padding: "10px", width: "500px", alignContent: "center"
            }}>
            { task.type === "recurring" ?
                <EditRecurringTask task={task} onSubmit={onSubmit} onDelete={deleteTask} popupState={popupState} /> :
                <EditSingleTask task={task} onSubmit={onSubmit} onDelete={deleteTask} popupState={popupState} />}
        </form>

    )
}

export default EditTask