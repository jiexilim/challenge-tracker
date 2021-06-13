import React from 'react'
import { Checkbox } from '@material-ui/core'
import { useStyles } from "../../functions"

const Subtask = ({ subtask, onCheck }) => {
    const classes = useStyles()

    return (
        <div className="subtask-container">
            <Checkbox
                classes={{ root: classes.checkBox }}
                checked={subtask.isCompleted}
                onChange={() => onCheck(subtask)}
            />
            <p>{subtask.name}</p>
        </div>
    )
}

export default Subtask
