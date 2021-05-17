import React from 'react'
import { FaCalendarCheck, FaTimes, FaEdit } from "react-icons/fa"

const Goal = ({goal, onDelete, onEdit}) => {
    return (
        <div className="goal-item">
            <h3>{goal.title}</h3>
            <h6>{goal.description}</h6>
            <h6>{goal.benefit}</h6>
            <h6><FaCalendarCheck />  {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit', day: '2-digit'
            }).format(new Date(goal.endDate))}</h6>
            <FaTimes
                style={{ color: 'red', cursor: 'pointer', marginLeft: '10px'}}
                onClick={() => onDelete(goal._id)}
            />  
            <FaEdit
                style={{ color: 'green', cursor: 'pointer', marginLeft: '10px' }}
                onClick={() => onEdit(goal)}
            />



        </div>
    )
}

export default Goal
