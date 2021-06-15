import React, { useState, useEffect } from 'react'
import { Checkbox } from '@material-ui/core'
import { useStyles } from "../../functions"

const Subtask = ({ subtask, onCheck }) => {
    const [isCompleted, setIsCompleted] = useState(subtask.isCompleted)
    const classes = useStyles()

    useEffect(() => onCheck(subtask.id, isCompleted), [isCompleted])

    const check = () => {
        setIsCompleted(!isCompleted)
    }

    return (
        <div className="subtask-container">
            <Checkbox
                classes={{ root: classes.checkBox }}
                checked={isCompleted}
                onChange={check}
            />
            <p>{subtask.name}</p>
        </div>
    )
}

export default Subtask
