import React, { useState } from 'react'
import { useParams } from "react-router-dom"
import { handleEnter, useStyles } from "../../functions"
import DatePicker from 'react-date-picker'
import { Button, TextField } from "@material-ui/core"
import TempSubtask from "./TempSubtask"

const SingleTaskForm = ({ onSubmit, popupState }) => {
    const { id } = useParams()
    const classes = useStyles()
    const [showSubtasksForm, setShowSubtasksForm] = useState(false)
    const [showNotesForm, setShowNotesForm] = useState(false)
    const [name, setName] = useState("")
    const [endDate, setEndDate] = useState(new Date())
    const [subtasks, setSubtasks] = useState([])
    const [notes, setNotes] = useState("")
    const [subtaskName, setSubtaskName] = useState("")

    const deleteSubtask = (id) => {
        const newSubtasks = subtasks.filter((subtask) => subtask.id !== id)
        setSubtasks(newSubtasks);
    }

    const onClick = () => {
        popupState.close()
        onSubmit({ name, type: 'single', endDate, subtasks, notes, goalId: id })
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
                    showTimeSelect
                    onSelect={(date) => setEndDate(date)}
                    onChange={(date) => setEndDate(date)}
                />
            </div>
            <div onKeyDown={handleEnter}>
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
                        <p>Subtasks:</p>
                        {subtasks.length !== 0 &&
                            <div className="temp-subtask-container">
                                {
                                    subtasks.map((subtask, index) => <TempSubtask
                                        key={index}
                                        subtask={subtask}
                                        onDelete={deleteSubtask} />)
                                }
                            </div>
                        }
                        <div className="subtask-input-container">
                            <div className="subtask-input">
                                <TextField
                                    variant="outlined"
                                    classes={{ root: classes.taskInput }}
                                    value={subtaskName}
                                    placeholder='Subtask'
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
                {
                    !showNotesForm &&
                    <Button
                        classes={{ root: classes.subBlueButton }}
                        onClick={() => setShowNotesForm(true)}
                    >
                        ADD NOTES
                    </Button>
                }
                {
                    showNotesForm &&
                    <label>
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
                    </label>
                }
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
                    onClick={onClick}
                >
                    SAVE
                </Button>
            </div>
        </div>
    )
}

export default SingleTaskForm