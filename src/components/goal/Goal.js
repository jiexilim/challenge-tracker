import React, { useState, useEffect } from 'react'
import { useServer } from "../../Server"
import { FaCalendarCheck } from "react-icons/fa"
import { IoIosArrowDropdownCircle } from "react-icons/io"
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
        <div className="goal-item">
            <span className="pointer-item" onClick={() => onAccess(goal)}>
            <h3 className="goal-title" style={{ display: "inline-block", marginRight:"50px" }}>{goal.title} </h3>
            <h4 style={{ display: "inline-block", marginRight:"50px" }}><FaCalendarCheck />  {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit', day: '2-digit'
            }).format(new Date(goal.endDate))}</h4>
            <h3 className="goal-is-completed" style={{ color: "#0290B0", display: "inline-block", marginRight:"50px" }}>{isCompleted && "completed!"}</h3>
            </span>
            <IoIosArrowDropdownCircle style={{ display: "inline-block", marginRight:"50px", color: "#0290B0" }} />
            {/* <FaTimes
                style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
                onClick={() => onDelete(goal._id)}
            />
            <FaEdit
                style={{ color: 'green', cursor: 'pointer', marginLeft: '10px' }}
                onClick={() => onEdit(goal)}
            /> */}



        </div>
    )
}

export default Goal
