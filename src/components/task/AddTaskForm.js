import React, { useState, useEffect } from 'react'
import { useServer } from "../../Server"
import SingleTaskForm from './SingleTaskForm'
import RecurringTaskForm from "./RecurringTaskForm"
import { useStyles } from "../../functions"
import { Button } from '@material-ui/core'
import axios from "axios"

const AddTaskForm = ({ popupState, onAddTask }) => {
    const serverURL = useServer()
    const classes = useStyles()
    const [type, setType] = useState("single")

    useEffect(() => {
        document.body.style.overflowY = "hidden"
        return () => {
            document.body.style.overflowY = null
        }
    })

    const onSubmit = (task) => {
        axios.post(serverURL + "/task/create", task)
            .then(res => console.log(res.data))

        onAddTask(task)
    }

    return (
        <div className="task-form-wrapper">
            <Button
                classes={{ root: type === "single" ? classes.clickedTaskTypeButton : classes.taskTypeButton }}
                onClick={() => setType("single")}
            >
                SINGLE TASK
            </Button>
            <Button
                classes={{ root: type === "recurring" ? classes.clickedTaskTypeButton : classes.taskTypeButton }}
                onClick={() => setType("recurring")}
            >
                RECURRING TASK
            </Button>
            <form onSubmit={onSubmit} className="add-task-form">
                {type === 'single' && <SingleTaskForm onSubmit={onSubmit} popupState={popupState} />}
                {type === 'recurring' && <RecurringTaskForm onSubmit={onSubmit} popupState={popupState} />}
            </form>
        </div>
    )
}

export default AddTaskForm