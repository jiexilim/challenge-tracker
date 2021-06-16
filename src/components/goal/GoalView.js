import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useServer } from "../../Server";
import Task from "../task/Task.js";
import GoalViewHeader from "./GoalViewHeader"
import AddTaskForm from "../task/AddTaskForm"
import { useStyles } from "../../functions"
import { Popover, Button } from '@material-ui/core'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import axios from "axios";

const GoalView = () => {
    const { id } = useParams()
    const serverURL = useServer()
    const classes = useStyles()
    const [goal, setGoal] = useState({})
    const [tasks, setTasks] = useState([])
    const [numOfTasks, setNumOfTasks] = useState(tasks.length)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const getData = async () => {
            await axios.get(serverURL + "/goal/" + id)
                .then(res => setGoal(res.data.goal))
                .catch(err => console.log(err))

            await axios.get(serverURL + "/task/", { params: { goalId: id } })
                .then(res => {
                    setTasks(res.data)
                })
                .catch(err => console.log(err))
        }
        getData()
        updateProgressBar()
    }, [tasks])

    const onAddTask = (task) => {
        setTasks([...tasks, task])
        updateProgressBar()
    }

    const deleteTask = (id) => {
        const i = tasks.findIndex(function (task) {
            return task._id === id
        })

        let copyTasks = [...tasks]
        copyTasks.splice(i, 1)
        setTasks(copyTasks)
    }

    const updateProgressBar = () => {
        setNumOfTasks(tasks.length)
        setProgress(tasks.filter((task) => task.isCompleted).length)
    }

    return (
        <div className="content" id="goal-view">
            <GoalViewHeader
                goal={goal}
                progress={progress}
                numOfTasks={numOfTasks}
            />
            <PopupState variant="popover" popupId="popup-popover">
                {(popupState) => (
                    <div>
                        <Button
                            classes={{ root: classes.mainBlueButton }}
                            variant="contained"
                            {...bindTrigger(popupState)}
                        >
                            ADD TASK
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
                            <AddTaskForm popupState={popupState} onAddTask={onAddTask} />
                        </Popover>
                    </div>
                )}
            </PopupState>
            <div id="tasks-container">
                {
                    tasks.map((task, index) => (
                        <Task
                            key={index}
                            task={task}
                            onDelete={deleteTask}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default GoalView