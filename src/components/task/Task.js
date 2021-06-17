import React, { useState, useEffect } from 'react'
import EditTaskForm from "./EditTaskForm"
import { FaEdit } from "react-icons/fa"
import { MdReplay } from "react-icons/md"
import { AiOutlineUnorderedList } from "react-icons/ai"
import { useServer } from "../../Server"
import Subtask from "./Subtask"
import { useStyles } from "../../functions"
import { Popover, Button, Checkbox, TextField } from '@material-ui/core'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import axios from "axios"

const Task = ({ task, onDelete }) => {
    const serverURL = useServer()
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    const classes = useStyles()
    const [showSubtasks, setShowSubtasks] = useState(false)
    const [showRecurProgress, setShowRecurProgress] = useState(false)
    const [completeAction, setCompleteAction] = useState(true)

    const [newlyCompleted, setNewlyCompleted] = useState(0)
    const [numCompleted, setNumCompleted] = useState(task.numCompleted)
    const [dates, setDates] = useState(task.dates)
    const [computeRecurDatesInfo, setComputeRecurDatesInfo] = useState(task.computeRecurDatesInfo)
    const [numSkipped, setNumSkipped] = useState(0)

    const [isCompleted, setIsCompleted] = useState(task.isCompleted)
    const [subtasks, setSubtasks] = useState(task.subtasks)
    const [name, setName] = useState(task.name)
    const [endDate, setEndDate] = useState(task.endDate)
    const [notes, setNotes] = useState(task.notes)

    useEffect(() => {
        if (task.type === "single") {
            axios.post(serverURL + `/task/update/${task._id}`, {
                name: name,
                type: "single",
                endDate: endDate,
                subtasks: subtasks,
                notes: notes,
                isCompleted: isCompleted,
            })
                .then(res => console.log(res.data))
        } else if (task.type === "recurring") {
            axios.post(serverURL + `/task/update/${task._id}`,
                {
                    name: name,
                    type: "recurring",
                    dates: dates,
                    numCompleted: numCompleted,
                    computeRecurDatesInfo: computeRecurDatesInfo,
                    notes: notes,
                    isCompleted: isCompleted,
                }
            ).then(res => console.log(res.data));
        }

        if (task.type === "single" && task.subtasks.length !== 0) {
            const numCompletedSubtask = subtasks.filter((subtask) => subtask.isCompleted).length
            if (numCompletedSubtask === task.subtasks.length) {
                setIsCompleted(true)
            } else {
                setIsCompleted(false)
            }
        }

        if (task.type === "recurring") {
            if (numCompleted === dates.length) {
                setIsCompleted(true)
            } else {
                setIsCompleted(false)
            }
        }

    }, [isCompleted, subtasks, name, endDate, notes, numCompleted, dates])

    const checkTask = () => {
        setIsCompleted(!isCompleted)
    }

    const checkSubtask = (id, isCompleted) => {

        const i = subtasks.findIndex(function (subtask) {
            return subtask.id === id
        })

        let copyOfSubtasks = [...subtasks]

        let copyOfSubtask = { ...copyOfSubtasks[i] }

        copyOfSubtask.isCompleted = isCompleted

        copyOfSubtasks[i] = copyOfSubtask

        setSubtasks(copyOfSubtasks)
    }

    const onEditSubmit = (task) => {
        if (task.type === "single") {
            setName(task.name)
            setEndDate(task.endDate)
            setSubtasks(task.subtasks)
            setNotes(task.notes)
        } else {
            setName(task.name)
            setDates(task.dates)
            setNumCompleted(task.numCompleted)
            setNotes(task.notes)
            setComputeRecurDatesInfo(task.computeRecurDatesInfo)
        }
    }

    const onSaveRecurProgress = () => {
        // skip
        const newDates = [...dates]
        newDates.splice(Number(numCompleted), Number(numSkipped))
        setDates(newDates)

        // complete
        setNumCompleted(Number(numCompleted) + Number(newlyCompleted))

        setNumSkipped(0)
        setNewlyCompleted(0)
    }

    return (
        <div className="whole-task-container">
            <div className="main-task-container">
                <div className="task-type-icon">
                    {
                        task.type === "recurring" ?
                            <Button>
                                <MdReplay
                                    size={20}
                                    onClick={() => setShowRecurProgress(!showRecurProgress)}
                                />
                            </Button> :
                            task.subtasks.length === 0 ?
                                <Checkbox
                                    classes={{ root: classes.checkBox }}
                                    checked={isCompleted}
                                    onChange={checkTask}
                                /> :
                                <Button>
                                    <AiOutlineUnorderedList
                                        size={20}
                                        onClick={() => {
                                            // e.stopPropagation()
                                            setShowSubtasks(!showSubtasks)
                                        }}
                                    />
                                </Button>
                    }
                </div>
                <h3 className="task-name">{task.name}</h3>
                <h5 className="task-date-completed">
                    {
                        isCompleted ?
                            <h3>Completed !</h3> :
                            (task.type === "recurring" ?
                                new Date(dates[numCompleted]).getDate()
                                + "   " + monthNames[new Date(dates[numCompleted]).getMonth()]
                                + "   " + new Date(dates[numCompleted]).getFullYear() :
                                new Date(endDate).getDate()
                                + "   " + monthNames[new Date(endDate).getMonth()]
                                + "   " + new Date(endDate).getFullYear())
                    }
                </h5>
                <PopupState variant="popover" popupId="popup-popover">
                    {(popupState) => (
                        <div className="popup-edit">
                            <Button {...bindTrigger(popupState)}>
                                <FaEdit className="task-edit-icon" />
                            </Button>
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <EditTaskForm popupState={popupState} task={task} onDelete={onDelete} onEditSubmit={onEditSubmit} />
                            </Popover>
                        </div>
                    )}
                </PopupState>
            </div>

            {
                (showSubtasks && task.type === "single") &&
                <div>
                    {
                        task.subtasks.map((subtask, index) =>
                            <Subtask key={index} subtask={subtask} onCheck={checkSubtask} />)
                    }
                </div>
            }
            {
                showRecurProgress &&
                <div className="recur-task-data">
                    <div className="recur-task-data-btn-container">
                        <Button
                            classes={{ root: completeAction ? classes.clickedCompleteSkipButton : classes.completeSkipButton }}
                            variant="contained"
                            onClick={() => setCompleteAction(true)}
                        >
                            Complete
                        </Button>
                        <Button
                            classes={{ root: !completeAction ? classes.clickedCompleteSkipButton : classes.completeSkipButton }}
                            variant="contained"
                            onClick={() => setCompleteAction(false)}
                        >
                            Skip
                        </Button>
                    </div>
                    {
                        completeAction ?
                            <label className="complete-skip-input">
                                <p>Complete: </p>
                                <TextField
                                    type="number"
                                    variant="outlined"
                                    classes={{ root: classes.taskInput }}
                                    value={newlyCompleted}
                                    onChange={(e) => setNewlyCompleted(e.target.value)}
                                />
                            </label> :
                            <label className="complete-skip-input">
                                <p>Skip: </p>
                                <TextField
                                    type="number"
                                    variant="outlined"
                                    classes={{ root: classes.taskInput }}
                                    value={numSkipped}
                                    onChange={(e) => setNumSkipped(e.target.value)}
                                />
                            </label>
                    }
                    <div className="recur-task-info">
                        <p> Progress: {numCompleted} of {dates.length} instances completed </p>
                        <Button
                            classes={{ root: classes.blueButton }}
                            onClick={onSaveRecurProgress}
                        >
                            SAVE
                        </Button>
                    </div>
                </div >
            }
        </div >
    )
}

export default Task