import React, { useState, useEffect } from 'react'
import { useServer } from "../../Server"
import DashboardTask from "../task/DashboardTask"
import DBProgressBar from '../admin/DBProgressBar'
import { FaCalendarCheck } from "react-icons/fa"
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io"
import axios from "axios";

const Goal = ({ goal, onAccess }) => {
    const serverURL = useServer();
    const [isCompleted, setIsCompleted] = useState(false)
    const [showTasks, setShowTasks] = useState(false)
    const [tasks, setTasks] = useState([])
    const [numOfTasks, setNumOfTasks] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        axios.get(serverURL + "/task/",
            { params: { goalId: goal._id } })
            .then(res => {
                const tasks = res.data;
                setNumOfTasks(tasks.length)
                setProgress(tasks.filter((task) => task.isCompleted).length)
                if (progress === numOfTasks && numOfTasks !== 0) {
                    setIsCompleted(true)
                }
                setTasks(tasks.filter((task) => !task.isCompleted))
            })
            .catch(err => console.log(err))
    })

    return (
        <div className="goal-task-container">
            <div class="goal-container">
                <span
                    className="access-goal"
                    onClick={() => onAccess(goal._id)}>
                    <h3>{goal.name} </h3>
                    <DBProgressBar percent={progress / numOfTasks} />
                    <h4>
                        <FaCalendarCheck />  
                        {
                            new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: '2-digit', day: '2-digit'
                            }).format(new Date(goal.endDate))
                        }
                    </h4>
                    <h3 className="completed-msg">{ isCompleted && "completed!" }</h3>
                </span>
                {
                    showTasks ?
                        <IoIosArrowDropupCircle
                            className="goal-drop-down-icon"
                            onClick={() => setShowTasks(false)}
                        /> :
                        <IoIosArrowDropdownCircle
                            className="goal-drop-up-icon"
                            onClick={() => setShowTasks(true)}
                        />
                }
            </div>
            {
                showTasks &&
                tasks.map((task, index) => (
                    <DashboardTask
                        key={index}
                        task={task}
                    />
                ))
            }
        </div>
    )
}

export default Goal
