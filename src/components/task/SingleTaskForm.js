import React, { useState } from 'react'
import { handleEnter } from "../../functions"
import DatePicker from 'react-date-picker'
import { Button } from "@material-ui/core"
import TempSubtask from "./TempSubtask"

const SingleTaskForm = ({ onSubmit, popupState }) => {
    const goal = JSON.parse(localStorage.getItem('currentGoal'));
    const [showSubtasksForm, setShowSubtasksForm] = useState(false)
    const [showNotesForm, setShowNotesForm] = useState(false)
    const [title, setTitle] = useState("")
    const [endDate, setEndDate] = useState(new Date())
    const [notes, setNotes] = useState("")
    const [subtasks, setSubtasks] = useState([])
    const [subtaskName, setSubtaskName] = useState("")

    const deleteSubtask = (id) => {
        const newSubtasks = subtasks.filter((subtask) => subtask.id !== id)
        setSubtasks(newSubtasks);
    }

    const onClick = () => {
        popupState.close()
        onSubmit({title, type: 'single', endDate, subtasks, notes, goalId: goal._id })
    }

    return (
        <div style={{  overflowY: "scroll",  height: "300px" }}>

            <div className="small-form-group" >
                <label>
                    <h4>Your Task:</h4>
                    <input
                        type="text"
                        placeholder="Name"
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
         
            <button
                type="button"
                className="sub-btn"
                onClick={() => setShowNotesForm(true)}>
                Add notes
            </button>
            {
                showNotesForm &&
                <div className="small-form-group" style={{ padding: "10px" }}  onKeyDown={handleEnter}>
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
            }

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
                        subtasks.map((subtask, index) => <TempSubtask
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
                    margin: "5px",  marginTop: "30px"
                }} onClick={popupState.close}>
                    Cancel
                
            </Button>

            <Button style={{ backgroundColor: '#0290B0', color: 'white', padding: "10px 10px",
                    margin: "20px", float: "right" }} variant="contained" onClick={() => {
                onClick()
            }}>
                SAVE
            </Button>

        </div>
    )
}

export default SingleTaskForm