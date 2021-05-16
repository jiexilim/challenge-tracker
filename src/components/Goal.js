import React from 'react'
import { FaRegCalendarCheck, FaTimes } from "react-icons/fa"

const Goal = ({goal, onDelete}) => {
    return (
        <div className="goal-item">
            <h3>{goal.title}</h3>
            <h6>{goal.description}</h6>
            <h6>{goal.benefit}</h6>
            <h6><FaRegCalendarCheck />  {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit', day: '2-digit'
            }).format(new Date(goal.endDate))}</h6>
            <FaTimes
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => onDelete(goal._id)}
            />



        </div>
    )
}

export default Goal
