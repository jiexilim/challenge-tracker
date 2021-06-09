import React from 'react'
import { ImCross } from "react-icons/im"

const Subtask = ({ subtask, onDelete }) => {
    return (
        <div className="row-item">
            <ImCross
                className="pointer-item"
                size="10px"
                style={{ display: 'inline-block', marginRight: '50px', color: "grey" }}
                onClick={() => onDelete(subtask.id)}
            />
            <h5 style={{ display: 'inline-block', marginRight: '50px' }}>{subtask.name}</h5>
        </div>
    )
}

export default Subtask
