import React, { useState, useEffect } from 'react'
import ProgressBar from "../admin/ProgressBar";
import EditGoal from "./EditGoal"
import { withRouter } from "react-router-dom";
import { FaEdit } from "react-icons/fa"
import { Button } from "@material-ui/core"

const GoalViewHeader = ({ goal, progress, numOfTasks }) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    const [openForm, setOpenForm] = useState(false)
   
    return (
        (!openForm) ?
            <div id="goal-view-header">
                <span>
                    <h2>
                        {goal.name}
                        <Button onClick={() => setOpenForm(true)}>
                            <FaEdit 
                                id="edit-icon" 
                                size={20}
                            />
                        </Button>
                    </h2>
                    <h3>{goal.notes}</h3>
                </span>
                <ProgressBar
                    percent={progress / numOfTasks}
                    completed={`${progress} / ${numOfTasks}`}
                    due={
                        new Date(goal.endDate).getDate()
                        + "   " + monthNames[new Date(goal.endDate).getMonth()]
                        + "   " + new Date(goal.endDate).getFullYear()
                    }
                />
            </div> :
            <EditGoal goal={goal} closeForm={() => setOpenForm(false)} />
    )
}

export default withRouter(GoalViewHeader)
