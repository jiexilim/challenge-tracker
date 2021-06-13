import React from 'react'
import { FaTimes } from "react-icons/fa"

const Subtask = ({ subtask, onDelete }) => {
    return (
        <div className="temp-subtask">
            <FaTimes
                className="temp-subtask-cancel"
                size={15}
                onClick={() => onDelete(subtask.id)}
            />
            <h4 className="temp-subtask-name">{subtask.name}</h4>
        </div>
    )
}

export default Subtask
