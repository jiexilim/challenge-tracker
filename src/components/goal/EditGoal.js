import React, { useState } from 'react'
import { withRouter } from "react-router-dom"
import { useServer } from "../../Server"
import axios from 'axios';
import DatePicker from 'react-date-picker'
import { handleEnter } from "../../functions"
import { TextField, Button } from "@material-ui/core"

const EditGoal = ({ history, goal, closeForm, onUpdate }) => {
    const serverURL = useServer();
    const [title, setTitle] = useState(goal.title)
    const [benefit, setBenefit] = useState(goal.benefit)
    const [endDate, setEndDate] = useState(goal.endDate)
    const [notes, setNotes] = useState(goal.notes)
    const goalId = goal._id

    const onSubmit = () => {
        closeForm()
        const updateGoal = {
            title,
            benefit,
            endDate,
            notes,
            goalId: goalId
        }
        onUpdate(updateGoal)
        axios.post(serverURL + "/goal/edit", updateGoal).then(res => console.log(res.data));
    }

    const deleteGoal = async () => {
        axios.delete(serverURL + "/goal/delete",
            { data: { goalId: goalId } })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err))
        history.push("/")
    }

    return (
        <div className="form-body">
            <div style={{ width: "60%", display: "flex", justifyContent: "space-between" }}>
                <div style={{ flex: 1 }}>
                    <TextField label="Goal Name:" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div style={{ flex: 1 }}>
                    <TextField label="Benefit:" value={benefit} onChange={(e) => setBenefit(e.target.value)}/>
                </div>
                
            </div>
            <div style={{ width: "60%", display: "flex", justifyContent: "space-between" }}>
            
            <div className="form-group" style={{flex: 1 }}>
                    <label style={{ color: "#888888", fontSize: "13px" }}>
                        End point:
                    <br />
                    <DatePicker
                        value={endDate}
                        showTimeSelect
                        onSelect={(date) => setEndDate(date)}
                        onChange={(date) => setEndDate(date)}
                    />
                </label>
            </div>
            <div className="small-form-group" style={{ flex: 1 }} onKeyDown={handleEnter}>
            <label style={{ color: "#888888", fontSize: "13px" }}>
                        Notes:
                        <textarea
                            placeholder="Your notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={5}
                            cols={50}
                        />
                    </label>
                </div>
</div>

            <div style={{ marginBottom: "20px" }}>
            <Button style={{
                    background: "none", border: "none", padding: "none",
                    color: "#0290B0", textDecoration: "underline",
                    marginRight: "10px"
                }} onClick={closeForm}>
                    Cancel
                
            </Button>
          
            <Button style={{ backgroundColor: '#0290B0', color: 'white', marginRight: "10px" }}
                    variant="contained" onClick={() => {
                        closeForm()
                        deleteGoal()}}>
                DELETE
            </Button>
                <Button style={{ backgroundColor: '#0290B0', color: 'white'}}
                    variant="contained" onClick={onSubmit}>
                    SAVE CHANGES
            </Button>
            </div>
            </div>
    );
};

export default withRouter(EditGoal)
