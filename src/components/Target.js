import React from 'react'
import { FaCalendarCheck, FaTimes, FaEdit } from "react-icons/fa"

const Target = ({target, onDelete, onEdit, onCheck}) => {
    return (
        <div className="target-item">
            <label>
            <h3 style={ target.isCompleted ? { textDecorationLine: 'line-through' } : null }>{target.title}</h3>
            <h6><FaCalendarCheck />  {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit', day: '2-digit'
            }).format(new Date(target.endDate))}</h6>
            <FaTimes
                style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
                onClick={() => onDelete(target._id)}
            />
            <FaEdit
                style={{ color: 'green', cursor: 'pointer', marginLeft: '10px' }}
                onClick={() => onEdit(target)}
            />
             </label>
            <input  
                style={{ cursor: 'pointer', marginLeft: '10px' }}
                type="checkbox"
                checked={target.isCompleted}
                onChange={() => onCheck(target)} 
            />
        </div>
    )
}

export default Target
