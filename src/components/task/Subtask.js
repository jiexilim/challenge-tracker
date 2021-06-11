import React from 'react'

const Subtask = ({ subtask, onCheck }) => {
    return (
        <div style={{ marginLeft: "40px" }}>
            <input
                style={{ cursor: 'pointer', marginLeft: "10px", marginRight: "20px" }}
                type="checkbox"
                checked={subtask.isCompleted}
                onChange={() => onCheck(subtask)}
            />
            <h3
                style={{ textDecorationLine: subtask.isCompleted ? 'line-through' : 'none', display: "inline-block"}}>
                {subtask.name}
            </h3>
        </div>
    )
}

export default Subtask
