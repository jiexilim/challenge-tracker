import React, { useState } from 'react'
import { handleEnter, useStyles } from "../../functions"
import DatePicker from 'react-date-picker'
import TempSubtask from "./TempSubtask"
import { Button, TextField } from "@material-ui/core"

const EditSingleTask = ({ task, onSubmit, onDelete, popupState }) => {
    const classes = useStyles()
    const [showSubtasksForm, setShowSubtasksForm] = useState(false)
    const [name, setName] = useState(task.name)
    const [endDate, setEndDate] = useState(new Date(task.endDate))
    const [subtasks, setSubtasks] = useState(task.subtasks)
    const [notes, setNotes] = useState(!task.notes ? "" : task.notes)
    const [subtaskName, setSubtaskName] = useState("")
    const isCompleted = task.isCompleted

    const deleteSubtask = (id) => {
        const newSubtasks = subtasks.filter((subtask) => subtask.id !== id)
        setSubtasks(newSubtasks);
    }

    const onSave = () => {
        popupState.close()
        onSubmit({ name, type: 'single', endDate, subtasks, notes, isCompleted })
    }

    return (
        <div className="task-form">
            <div onKeyDown={handleEnter}>
                <p>Task name:</p>
                <TextField
                    variant="outlined"
                    classes={{ root: classes.taskInput }}
                    placeholder="Task name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div onKeyDown={handleEnter}>
                <p>Complete by:</p>
                <DatePicker
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                />
            </div>
            <div onKeyDown={handleEnter}>
                {subtasks.length !== 0 &&
                    <div className="temp-subtask-container">
                        <p>Subtasks:</p>
                        {
                            subtasks.filter((subtask) => !subtask.isCompleted).map((subtask, index) => <TempSubtask
                                key={index}
                                subtask={subtask}
                                onDelete={deleteSubtask} />)
                        }
                    </div>
                }
                {
                    !showSubtasksForm ?
                        <Button
                            classes={{ root: classes.subBlueButton }}
                            onClick={() => setShowSubtasksForm(true)}
                        >
                            ADD SUBTASK
                        </Button> :
                        <Button
                            classes={{ root: classes.subBlueButton }}
                            onClick={() => setSubtasks([])}
                        >
                            CLEAR SUBTASKS
                        </Button>
                }
                {
                    showSubtasksForm &&
                    <label>
                        <div className="subtask-input-container">
                            <div className="subtask-input">
                                <TextField
                                    variant="outlined"
                                    classes={{ root: classes.taskInput }}
                                    placeholder='Subtask'
                                    value={subtaskName}
                                    onChange={(e) => setSubtaskName(e.target.value)}
                                />
                            </div>
                            <Button
                                classes={{ root: classes.subBlueButton }}
                                onClick={() => {
                                    const id = Math.floor(Math.random() * 10000) + 1
                                    const newSubtask = { id: id, name: subtaskName, isCompleted: false };
                                    setSubtasks([...subtasks, newSubtask])
                                    setSubtaskName("")
                                }}
                            >
                                +
                            </Button>
                        </div>
                    </label>
                }
            </div>
            <div onKeyDown={handleEnter}>
                <p>Notes:</p>
                <TextField
                    classes={{ root: classes.taskInput }}
                    multiline={true}
                    placeholder="Notes"
                    variant="outlined"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>
            <div className="task-form-btn-container">
                <Button
                    classes={{ root: classes.cancelButton }}
                    onClick={popupState.close}
                >
                    CANCEL
                </Button>
                <Button
                    classes={{ root: classes.blueButton }}
                    onClick={onDelete}
                >
                    DELETE
                </Button>
                <Button
                    classes={{ root: classes.blueButton }}
                    onClick={onSave}
                >
                    SAVE
                </Button>
            </div>
        </div>
    )
}

export default EditSingleTask
