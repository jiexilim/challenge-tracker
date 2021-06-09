import React, { useState } from 'react'
import { handleEnter } from "../../functions"
import DatePicker from 'react-date-picker'
import TempSubtask from "./TempSubtask"
import { Button } from "@material-ui/core"

const EditSingleTask = ({ task, onSubmit, onDelete, popupState }) => {
    const [showSubtasksForm, setShowSubtasksForm] = useState(false)
    const [title, setTitle] = useState(task.title)
    const [endDate, setEndDate] = useState(task.endDate)
    const [subtasks, setSubtasks] = useState(task.subtasks)
    const [notes, setNotes] = useState(!task.notes ? "" : task.notes)
    const [subtaskName, setSubtaskName] = useState("")
    const targetId = task._id
    const isCompleted = task.isCompleted

    const deleteSubtask = (id) => {
        const newSubtasks = subtasks.filter((subtask) => subtask.id !== id)
        setSubtasks(newSubtasks);
    }

    const onSave = () => {
        onSubmit({title, type: 'single', endDate, subtasks, notes, targetId, isCompleted })
    }

    return (
        <div style={{  overflowY: "scroll",  height: "300px" }}>

            <div className="small-form-group" >
                <label>
                    <h4>Your Task:</h4>
                    <input
                        type="text"
                        placeholder={title}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
            </div>

            <div className="small-form-group"  onKeyDown={handleEnter}>
                <label>
                    <h4>Complete by:</h4>
                    <DatePicker
                        value={endDate}
                        showTimeSelect
                        onSelect={(date) => setEndDate(date)}
                        onChange={(date) => setEndDate(date)}
                    />
                </label>
            </div>
         
                <div className="small-form-group" style={{ padding: "10px" }} onKeyDown={handleEnter}>
                    <label>
                        <h4>Notes: (Opt)</h4>
                        <textarea
                            placeholder="Your notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={5}
                            cols={50}
                        />
                    </label>
                </div>
            

            {
                !showSubtasksForm ?
                    <button
                        type="button"
                        className="sub-btn"
                        onClick={() => setShowSubtasksForm(true)}>
                        Add subtasks
                </button> :
                    <button
                        type="button"
                        className="sub-btn"
                        onClick={() => setSubtasks([])}>
                        Clear subtasks
                </button>
            }

            {
                showSubtasksForm &&
                <div>
                    Subtasks:
                    {
                        subtasks.filter((subtask) => !subtask.isCompleted).map((subtask, index) => <TempSubtask
                            key={index}
                            subtask={subtask}
                            onDelete={deleteSubtask} />)
                    }
                    <div className="small-form-group" >
                        <input
                            type="text"
                            placeholder="Subtask"
                            value={subtaskName}
                            onChange={(e) => setSubtaskName(e.target.value)}
                        />
                        <button
                            type="button"
                            className="sub-btn"
                            onClick={() => {
                                const id = Math.floor(Math.random() * 10000) + 1
                                const newSubtask = { id: id, name: subtaskName, isCompleted: false };
                                setSubtasks([...subtasks, newSubtask])
                                setSubtaskName("")
                            }} >
                            Add
                    </button>
                    </div>
                </div>
            }
            <br/>
            <Button style={{
                    display: "block", background: "none",
                    float: "left", border: "none", padding: "none",
                    color: "#0290B0", textDecoration: "underline", padding: "10px 10px",
                    margin: "5px", marginTop: "30px"
                }} onClick={popupState.close}>
                    Cancel
                
            </Button>

            <Button style={{ backgroundColor: '#0290B0', color: 'white', padding: "10px 10px",
                    margin: "20px", float: "right" }} variant="contained" onClick={() => {
                popupState.close()
                onSave()
            }}>
                SAVE
            </Button>

            <Button style={{ backgroundColor: '#0290B0', color: 'white', padding: "10px 10px",
                    margin: "20px", float: "right" }} variant="contained" onClick={() => {
                popupState.close()
                onDelete(targetId)
            }}>
                DELETE
            </Button>

        </div>
    )
}

export default EditSingleTask
