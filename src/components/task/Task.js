import React, { useState } from 'react'
import EditTaskForm from "./EditTaskForm"
import { FaEdit } from "react-icons/fa"
import { MdReplay } from "react-icons/md"
import { AiOutlineUnorderedList } from "react-icons/ai"
import { useServer } from "../../Server"
import Subtask from "./Subtask"
import { Popover, Button } from '@material-ui/core'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import axios from "axios"

const Task = ({ target, onEdit, onCheck }) => {
    const serverURL = useServer()
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    const [showSubtasks, setShowSubtasks] = useState(false)
    const [showRecurProgress, setShowRecurProgress] = useState(false)
    const [numCompleted, setNumCompleted] = useState(0)
    const [numSkipped, setNumSkipped] = useState(0)
    const [completeAction, setCompleteAction] = useState(true)

    const onCheckSubtask = (subtask) => {
        let countCompletedSubtask = 0
        for (let sub of target.subtasks) {
            if (sub.id === subtask.id) {
                sub.isCompleted = !(sub.isCompleted)
            }
            if (sub.isCompleted) {
                countCompletedSubtask += 1
            }
        }

        if (countCompletedSubtask === target.subtasks.length) {
            target.isCompleted = true
        } else {
            target.isCompleted = false
        }
        axios.post(serverURL + "/target/edit",
            {
                title: target.title,
                type: "single",
                endDate: target.endDate,
                subtasks: target.subtasks,
                isCompleted: target.isCompleted,
                targetId: target._id
            }
        ).then(res => console.log(res.data))
    }

    const onSaveRecurProgress = () => {
        setShowRecurProgress(false)
        target.numCompleted = Number(target.numCompleted) + Number(numCompleted)

        if (target.numCompleted === target.dates.length) {
            target.isCompleted = true
        } else {
            target.isCompleted = false
        }

        setNumSkipped(0)
        setNumCompleted(0)

        axios.post(serverURL + "/target/edit",
            {
                title: target.title,
                type: "recurring",
                numCompleted: target.numCompleted,
                dates: target.dates,
                isCompleted: target.isCompleted,
                targetId: target._id
            }
        ).then(res => console.log(res.data));
    }

    return (
        <div>
            <div style={{ margin: '20px 0', flexDirection: 'row', display: "flex", width: "60%", alignItems: "center", borderBottom: "solid grey", borderWidth: "thin" }}>
                <span style={{ flex: 4 }}>
                    {
                        target.type === "recurring" ?
                            <MdReplay style={{ cursor: 'pointer', marginLeft: "10px", marginRight: "20px" }} onClick={() => setShowRecurProgress(!showRecurProgress)} /> :
                            target.subtasks.length === 0 ?
                                <input
                                    style={{ cursor: 'pointer', marginLeft: "10px", marginRight: "20px" }}
                                    type="checkbox"
                                    checked={target.isCompleted}
                                    onChange={() => onCheck(target)}
                                /> : <AiOutlineUnorderedList style={{ cursor: 'pointer', marginLeft: "10px", marginRight: "20px" }} onClick={() => setShowSubtasks(!showSubtasks)} />
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

                <PopupState variant="popover" popupId="popup-popover">
                    {(popupState) => (
                        <div>
                            <Button {...bindTrigger(popupState)}>
                                <FaEdit style={{ color: 'grey', cursor: 'pointer', flex: 1 }} />
                            </Button>
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <EditTaskForm popupState={popupState} task={target}/>

                            </Popover>
                        </div>
                    )}
                </PopupState>
            </div>

            {
                showSubtasks &&
                <div style={{ borderLeft: "1px solid grey", borderBottom: "1px solid grey", width: "60%" }}>
                    {
                        target.subtasks.map((subtask, index) =>
                            <Subtask key={index} subtask={subtask} onCheck={onCheckSubtask} />)
                    }
                </div>
            }

            {
                showRecurProgress &&
                <div className="small-form-group" style={{ borderLeft: "1px solid grey", borderBottom: "1px solid grey", width: "60%" }}>
                    <div style={{ marginLeft: "40px", paddingBottom: "10px", borderBottom: "solid #ccc", borderWidth: "thin" }}>
                        <button type="button" className="sub-btn" onClick={() => {
                            setCompleteAction(true)
                        }}>Complete</button>
                        <button type="button" className="sub-btn" onClick={() => {
                            setCompleteAction(false)
                        }}>Skip</button>
                        {
                        completeAction ?
                        <label>
                        <h4>Complete: </h4>
                        <input
                            type="number"
                            style={{ width: "100px" }}
                            value={numCompleted}
                            onChange={(e) => setNumCompleted(e.target.value)}
                        />
                        </label> :
                        <label>
                        <h4>Skip: </h4>
                        <input
                            type="number"
                            style={{ width: "100px" }}
                            value={numSkipped}
                            onChange={(e) => setNumSkipped(e.target.value)}
                        />
                        </label>
                        }
                        <h4> Progress: {target.numCompleted} of {target.dates.length} instances completed </h4>
                        <input type="button" value="Save" className="sub-btn"
                            style={{ display: "block", backgroundColor: "#0290B0", display: "block" }} onClick={onSaveRecurProgress} />
                    </div>
                </div>
            }


        </div>
    )
}

export default Task