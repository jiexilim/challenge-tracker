import React from 'react'
import { FaRegCalendarCheck } from "react-icons/fa"

const Goal = ({goal}) => {
    return (
        <div className="goal-item">
            <h3>{goal.title}</h3>
            <h6>{goal.description}</h6>
            <h6>{goal.benefit}</h6>
            <h6><FaRegCalendarCheck />  { new Intl.DateTimeFormat('en-US', {year: 'numeric', 
month: '2-digit',day: '2-digit'}).format(new Date(goal.endDate)) }</h6> 
            

            
        </div>
    )
}

export default Goal
