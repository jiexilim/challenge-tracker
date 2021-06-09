import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useServer } from "../../Server";
import Task from "../target/Task.js";
import GoalViewHeader from "./GoalViewHeader"
import AddTaskForm from "../target/AddTaskForm"
import { Popover, Button } from '@material-ui/core'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import axios from "axios";

const GoalView = () => {
    const { id } = useParams()
    const serverURL = useServer()
    const [goal, setGoal] = useState()
    const [targets, setTargets] = useState([])
    const [numOfTargets, setNumOfTargets] = useState()
    const [progress, setProgress] = useState()


    useEffect(() => {
        axios.get(serverURL + "/goal/" + id)
            .then(res => alert(res.data))
            .catch(err => console.log(err))

        axios.get(serverURL + "/target/",
            { params: { goalId: id } })
            .then(res => setTargets(res.data))
            .catch(err => console.log(err))

        setNumOfTargets(targets.length)
        setProgress(targets.filter((target) => target.isCompleted).length)
    })

    const checkTarget = async (target) => {
        axios.post(serverURL + "/target/edit", {
            name: target.name,
            type: "single",
            endDate: target.endDate,
            subtasks: target.subtasks,
            isCompleted: !(target.isCompleted),
            targetId: target._id
        }
        ).then(res => console.log(res.data));
    }

    return (
        <div className="content">
            {/* <GoalViewHeader 
                goal={goal}
                progress={progress}
                numOfTargets={numOfTargets}
            />
           */}
            <PopupState variant="popover" popupId="popup-popover">
                {(popupState) => (
                    <div>
                        <Button style={{backgroundColor: '#0290B0', color: 'white'}} variant="contained" {...bindTrigger(popupState)}>
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
                    targets.map((target, index) => (
                        <Task
                            key={index}
                            target={target}
                            onCheck={checkTarget}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default GoalView