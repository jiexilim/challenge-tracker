import React, { useState, useEffect } from 'react'
import { useServer } from "../Server"
import { FaCalendarCheck, FaTimes, FaEdit } from "react-icons/fa"
const axios = require("axios");

const Goal = ({goal, onDelete, onEdit, onAccess}) => {
    const serverURL = useServer();
    const [isCompleted, setIsCompleted] = useState(false)

    useEffect(() => {
        axios.get(serverURL + "/target/",
            { params: { goalId: goal._id } })
            .then(res => {
                const targets = res.data;
                const numOfTargets = targets.length
                const progress = targets.filter((target) => target.isCompleted).length
                if (progress === numOfTargets && numOfTargets !== 0) {
                    setIsCompleted(true)
                }
            })
            .catch(err => console.log(err))
    })

    return (
        <div className="goal-item" onClick={() => onAccess(goal)}>
            <h3 className="goal-title">{goal.title} </h3>
            <h3 className="goal-is-completed" style={{ color: 'green' }}>{isCompleted ? "completed!" : null}</h3>
            <h6>{goal.description}</h6>
            <h6>{goal.benefit}</h6>
            <h6><FaCalendarCheck />  {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit', day: '2-digit'
            }).format(new Date(goal.endDate))}</h6>
            <FaTimes
                style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
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
