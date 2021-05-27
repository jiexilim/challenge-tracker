import React, { useState } from 'react'
import CreateAction from "./CreateAction"
import { FaCalendarCheck, FaTimes, FaEdit } from "react-icons/fa"

const Target = ({ target, onDelete, onEdit, onCheck }) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="target-item">
            <label>
                <h3
                    className="target-element"
                    style={target.isCompleted ? { textDecorationLine: 'line-through' } : null}>
                    {target.title}
                </h3>
                <h6
                    className="target-element">
                    <FaCalendarCheck />     {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: '2-digit', day: '2-digit'
                    }).format(new Date(target.endDate))}
                </h6>
                <FaTimes
                    className="target-element"
                    style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
                    onClick={() => onDelete(target._id)}
                />
                <FaEdit
                    className="target-element"
                    style={{ color: 'green', cursor: 'pointer', marginLeft: '10px' }}
                    onClick={() => onEdit(target)}
                />
            </label>
            <input
                className="target-element"
                style={{ cursor: 'pointer', marginLeft: '10px' }}
                type="checkbox"
                checked={target.isCompleted}
                onChange={() => onCheck(target)}
            />
            <button
                className="target-element"
                onClick={() => {
                    setShowForm(! showForm);
                }}>
                Set Action
            </button>
            { showForm ? <CreateAction target={target} /> : null}
        </div>
    )
}

export default Target
