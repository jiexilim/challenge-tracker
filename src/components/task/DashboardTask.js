import React, { useState } from 'react'
import { MdReplay } from "react-icons/md"
import { AiOutlineUnorderedList } from "react-icons/ai"

const DashboardTask = ({ target }) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    return (
        <div style={{marginBottom: "20px"}}>
            <div style={{ marginTop: '20px', marginLeft: "40px", flexDirection: 'row', display: "flex", 
                width: "58%", alignItems: "center", boxShadow: "-4px 4px 0px #888888",
                border: "solid #0290B0 3px" }}>
                <span style={{ flex: 4 }}>
                    {
                        target.type === "recurring" ?
                            <MdReplay style={{ marginLeft: "10px", marginRight: "20px" }} /> :
                            target.subtasks.length === 0 ?
                                <h6 style={{ marginLeft: "10px", marginRight: "20px", display: "inline-block" }}> 1 </h6>
                            : <AiOutlineUnorderedList style={{ marginLeft: "10px", marginRight: "20px" }} />
                    }

                    <h3
                        style={{ textDecorationLine: target.isCompleted ? 'line-through' : 'none', display: "inline-block" }}>
                        {target.title}
                    </h3>
                </span>
                <h5
                    style={{ flex: 1 }}>

                    {
                        target.isCompleted ? <h3 style={{ color: "#0290B0" }}>Completed !</h3> :
                            (target.type === "recurring" ?
                                new Date(target.dates[target.numCompleted]).getDate()
                                + "   " + monthNames[new Date(target.endDate).getMonth()]
                                + "   " + new Date(target.endDate).getFullYear() :
                                new Date(target.endDate).getDate()
                                + "   " + monthNames[new Date(target.endDate).getMonth()]
                                + "   " + new Date(target.endDate).getFullYear())
                    }
                </h5>            
            </div>
        </div>
    )
}

export default DashboardTask
