import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useServer } from "../../Server";
import Task from "../task/Task.js";
import GoalViewHeader from "./GoalViewHeader"
import AddTaskForm from "../task/AddTaskForm"
import { blueButton } from "../../functions"
import { Popover, Button } from '@material-ui/core'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import axios from "axios";

const GoalView = () => {
    const { id } = useParams()
    const serverURL = useServer()
    const classes = blueButton()
    const [goal, setGoal] = useState({})
    const [tasks, setTasks] = useState([])
    const [numOfTasks, setNumOfTasks] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        axios.get(serverURL + "/goal/" + id)
            .then(res => setGoal(res.data.goal))
            .catch(err => console.log(err))

        axios.get(serverURL + "/task/",
            { params: { goalId: id } })
            .then(res => setTasks(res.data))
            .catch(err => console.log(err))

        setNumOfTasks(tasks.length)
        setProgress(tasks.filter((task) => task.isCompleted).length)
    })

    const checkTask = async (task) => {
        axios.post(serverURL + "/task/edit", {
            name: task.name,
            type: "single",
            endDate: task.endDate,
            subtasks: task.subtasks,
            isCompleted: !(task.isCompleted),
            taskId: task._id
        }
        ).then(res => console.log(res.data))
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
                            classes={{ root: classes.root }}
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
                            <AddTaskForm popupState={popupState} />
                        </Popover>
                    </div>
                )}
            </PopupState>
            <div>
                {
                    tasks.map((task, index) => (
                        <Task
                            key={index}
                            task={task}
                            onCheck={checkTask}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default GoalView