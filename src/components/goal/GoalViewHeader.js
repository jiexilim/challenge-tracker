import React, { useState, useEffect } from 'react'
import ProgressBar from "../admin/ProgressBar";
import EditGoal from "./EditGoal"
import { withRouter } from "react-router-dom";
import { FaEdit } from "react-icons/fa"
import { Button } from "@material-ui/core"

const GoalViewHeader = ({ goal, progress, numOfTargets }) => {
    const [openEditForm, setOpenEditForm] = useState(false)
    const [updateGoal, setUpdateGoal] = useState(goal)

    const onUpdate = (newGoal) => {
        setUpdateGoal(newGoal)
    }
    
    return (
        <div>
            {
                (!openEditForm) && 
                <div style={{ display: "flex", width: "60%", flexWrap: "wrap", justifyContent: "space-between" }}>
                    <span style={{ flex: 1 }}>
                        <h3 style={{ marginTop: "10px", display: "inline-block" }}>{updateGoal.name}</h3>
                        <span style={{ marginTop: "30px" }}>
                            <Button onClick={() => setOpenEditForm(true)}>
                                <FaEdit style={{ color: 'grey', cursor: 'pointer', height: "40px" }} />
                            </Button>
                        </span>
                    </span>
                    <ProgressBar
                        width={400}
                        style={{ flex: 1 }}
                        percent={progress / numOfTargets}
                        completed={`${progress} / ${numOfTargets}`}
                        due={`${new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: '2-digit', day: '2-digit'
                        }).format(new Date(goal.endDate))}`}
                    />
                    <h3>{updateGoal.notes}</h3>
                </div>
            }
            {
                openEditForm &&
                <EditGoal goal={goal} closeForm={()=> setOpenEditForm(false)} onUpdate={onUpdate} />
            }
        </div>
    )
}

export default withRouter(GoalViewHeader)
