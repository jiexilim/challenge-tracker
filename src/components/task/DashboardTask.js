import React, { useState } from 'react'
import { BiSubdirectoryRight } from "react-icons/bi"

const DashboardTask = ({ task }) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="db-task-container">
            <BiSubdirectoryRight
                className="db-task-icon"
                size={25}
            />
            <p className="db-task-name">{task.name}</p>
            <p className="db-task-date-completed">
                {
                    task.isCompleted ? <h3>Completed !</h3> :
                        (task.type === "recurring" ?
                            new Date(task.dates[task.numCompleted]).getDate()
                            + "   " + monthNames[new Date(task.endDate).getMonth()]
                            + "   " + new Date(task.endDate).getFullYear() :
                            new Date(task.endDate).getDate()
                            + "   " + monthNames[new Date(task.endDate).getMonth()]
                            + "   " + new Date(task.endDate).getFullYear())
                }
            </p>
        </div>
    )
}

export default DashboardTask
