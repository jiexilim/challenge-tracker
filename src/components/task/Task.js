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
    const [showSubtasks, setShowSubtasks] = useState(true)
    const [showRecurProgress, setShowRecurProgress] = useState(false)
    const [numCompleted, setNumCompleted] = useState(0)
    const [numSkipped, setNumSkipped] = useState(0)
    const [completeAction, setCompleteAction] = useState(true)

    const [isCompleted, setIsCompleted] = useState(task.isCompleted)
    const [subtasks, setSubtasks] = useState(task.subtasks)
    const [name, setName] = useState(task.name)
    const [endDate, setEndDate] = useState(task.endDate)
    const [notes, setNotes] = useState(task.notes)

    useEffect(() => {
        axios.post(serverURL + `/task/update/${task._id}`, {
            name: name,
            type: "single",
            endDate: endDate,
            subtasks: subtasks,
            notes: notes,
            isCompleted: isCompleted,
        })
            .then(res => console.log(res.data))

        if (task.subtasks.length !== 0) {
            const numCompletedSubtask = subtasks.filter((subtask) => subtask.isCompleted).length
            if (numCompletedSubtask === task.subtasks.length) {
                setIsCompleted(true)
            } else {
                setIsCompleted(false)
            }
        }

    }, [isCompleted, subtasks, name, endDate, notes])

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
        setName(task.name)
        setEndDate(task.endDate)
        setSubtasks(task.subtasks)
        setNotes(task.notes)
        console.log(subtasks)
    }

    // const onSaveRecurProgress = () => {
    //     // complete
    //     const newNumCompleted = Number(task.numCompleted) + Number(numCompleted)
    //     let updateIsCompleted = false

    //     // skip
    //     let newDates = task.dates
    //     if (numSkipped > 0) {
    //         newDates = task.dates.splice(task.numCompleted, numSkipped)
    //     }

    //     if (newNumCompleted === task.dates.length) {
    //         updateIsCompleted = true
    //     }

    //     setNumSkipped(0)
    //     setNumCompleted(0)

    //     axios.post(serverURL + `/task/update/${task._id}`,
    //         {
    //             name: task.name,
    //             type: "recurring",
    //             dates: newDates,
    //             numCompleted: newNumCompleted,
    //             computeRecurDatesInfo: task.computeRecurDatesInfo,
    //             notes: task.notes,
    //             isCompleted: updateIsCompleted,
    //         }
    //     ).then(res => console.log(res.data));
    // }

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
                                    // onClick={(e) => {
                                    //     e.stopPropagation()
                                    //     setShowSubtasks(!showSubtasks)
                                    // }}
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
                                new Date(task.dates[task.numCompleted]).getDate()
                                + "   " + monthNames[new Date(task.endDate).getMonth()]
                                + "   " + new Date(task.endDate).getFullYear() :
                                new Date(task.endDate).getDate()
                                + "   " + monthNames[new Date(task.endDate).getMonth()]
                                + "   " + new Date(task.endDate).getFullYear())
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
                showSubtasks &&
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
                                    value={numCompleted}
                                    onChange={(e) => setNumCompleted(e.target.value)}
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
                        <p> Progress: {task.numCompleted} of {task.dates.length} instances completed </p>
                        <Button
                            classes={{ root: classes.blueButton }}
                        // onClick={onSaveRecurProgress}
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