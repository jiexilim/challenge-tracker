import React, { useState } from 'react'
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

const Task = ({ task }) => {
    const serverURL = useServer()
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    const classes = useStyles()
    const [showSubtasks, setShowSubtasks] = useState(false)
    const [showRecurProgress, setShowRecurProgress] = useState(false)
    const [numCompleted, setNumCompleted] = useState(0)
    const [numSkipped, setNumSkipped] = useState(0)
    const [completeAction, setCompleteAction] = useState(true)

    const checkTask = () => {
        axios.post(serverURL + `/task/update/${task._id}`, {
            name: task.name,
            type: "single",
            endDate: task.endDate,
            subtasks: task.subtasks,
            notes: task.notes,
            isCompleted: !(task.isCompleted),
        })
            .then(res => console.log(res.data))
    }

    const checkSubtask = (subtask) => {
        let numCompletedSubtask = 0
        for (let sub of task.subtasks) {
            if (sub.id === subtask.id) {
                sub.isCompleted = !(sub.isCompleted)
            }
            if (sub.isCompleted) {
                numCompletedSubtask += 1
            }
        }

        if (numCompletedSubtask === task.subtasks.length) {
            task.isCompleted = true
        } else {
            task.isCompleted = false
        }
        axios.post(serverURL + `/task/update/${task._id}`, {
            name: task.name,
            type: "single",
            endDate: task.endDate,
            subtasks: task.subtasks,
            notes: task.notes,
            isCompleted: task.isCompleted,
        })
            .then(res => console.log(res.data))
    }

    const onSaveRecurProgress = () => {
        // complete
        const newNumCompleted = Number(task.numCompleted) + Number(numCompleted)
        let updateIsCompleted = false

        // skip
        let newDates = task.dates
        if (numSkipped > 0) {
            newDates = task.dates.splice(task.numCompleted, numSkipped)
        }

        if (newNumCompleted === task.dates.length) {
            updateIsCompleted = true
        }

        setNumSkipped(0)
        setNumCompleted(0)

        axios.post(serverURL + `/task/update/${task._id}`,
            {
                name: task.name,
                type: "recurring",
                dates: newDates,
                numCompleted: newNumCompleted,
                computeRecurDatesInfo: task.computeRecurDatesInfo,
                notes: task.notes,
                isCompleted: updateIsCompleted,
            }
        ).then(res => console.log(res.data));
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
                            </Button>
                            :
                            task.subtasks.length === 0 ?
                                <Checkbox
                                    classes={{ root: classes.checkBox }}
                                    checked={task.isCompleted}
                                    onChange={checkTask}
                                /> :
                                <Button>
                                    <AiOutlineUnorderedList
                                        size={20}
                                        onClick={() => setShowSubtasks(!showSubtasks)}
                                    />
                                </Button>
                    }
                </div>
                <h3 className="task-name">{task.name}</h3>
                <h5 className="task-date-completed">
                    {
                        task.isCompleted ?
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
                                <EditTaskForm popupState={popupState} task={task} />
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