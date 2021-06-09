import React, { useState, useEffect } from 'react'
import { useServer } from "../../Server"
import DashboardTask from "../target/DashboardTask"
import { FaCalendarCheck } from "react-icons/fa"
import { IoIosArrowDropdownCircle } from "react-icons/io"
import axios from "axios";

const Goal = ({ goal, onAccess }) => {
    const serverURL = useServer();
    const [isCompleted, setIsCompleted] = useState(false)
    const [showTasks, setShowTasks] = useState(false)
    const [tasks, setTasks] = useState([])

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
                setTasks(targets.filter((target) => !target.isCompleted))
            })
            .catch(err => console.log(err))
    })

    return (
        <div>
            <div style={{
                display: "flex", width: "60%",
                boxShadow: "-4px 10px 0px #888888",
                border: "solid #0290B0 3px", marginBottom: "30px",
                padding: "10px", borderRadius: "0px"
            }}>
                <span className="pointer-item" onClick={() => onAccess(goal)} style={{ display: "flex", width: "60%", flex: 4 }}>
                    <h3 style={{ flex: 3 }}>{goal.name} </h3>
                    <h4 style={{ flex: 1 }}><FaCalendarCheck />  {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: '2-digit', day: '2-digit'
                    }).format(new Date(goal.endDate))}</h4>
                    <h3 style={{ color: "#0290B0", flex: 1 }}>{isCompleted && "completed!"}</h3>
                </span>
                <IoIosArrowDropdownCircle style={{
                    display: "inline-block", cursor: "pointer",
                    marginRight: "50px", color: "#0290B0", flex: 1, paddingTop: "0px", height: "30px"
                }}
                    onClick={() => setShowTasks(!showTasks)}
                />
            </div>

            {
                showTasks &&
                tasks.map((task, index) => (
                    <DashboardTask
                        key={index}
                        target={task}
                    />
                ))
            }
        </div>
    )
}

export default Goal
