import React, { useState } from 'react'
import { withRouter, useParams } from "react-router-dom"
import { useServer } from "../../Server"
import axios from 'axios';
import DatePicker from 'react-date-picker'
import { handleEnter, blueButton, cancelButton, editGoalInput } from "../../functions"
import { TextField, Button } from "@material-ui/core"

const EditGoal = ({ history, goal, closeForm }) => {
    const { id } = useParams()
    const serverURL = useServer();
    const classes = blueButton()
    const cancelBtnClasses = cancelButton()
    const textFieldClasses = editGoalInput()
    const [name, setName] = useState(goal.name)
    const [benefit, setBenefit] = useState(goal.benefit)
    const [endDate, setEndDate] = useState(goal.endDate)
    const [notes, setNotes] = useState(goal.notes)

    const onSubmit = () => {
        closeForm()
        const updateGoal = {
            name,
            benefit,
            endDate,
            notes,
        }
        axios.post(serverURL + "/goal/update/" + id, updateGoal).then(res => console.log(res.data));
    }

    const deleteGoal = () => {
        closeForm()
        axios.delete(serverURL + "/goal/" + id)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err))
        history.push("/")
    }

    return (
        <div className="edit-goal-container">
            <div id="edit-goal-form">
                <div className="edit-goal-form-item" id="name-input">
                    <TextField
                        variant="outlined"
                        classes={{ root: textFieldClasses.root }}
                        label="Goal name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="edit-goal-form-item" id="purpose-input">
                    <TextField
                        classes={{ root: textFieldClasses.root }}
                        label="Purpose of the goal"
                        multiline={true}
                        variant="outlined"
                        rows={4}
                        value={benefit}
                        onChange={(e) => setBenefit(e.target.value)}
                    />
                </div>
                <div className="edit-goal-form-item" id="date-input">
                    <label>
                        <div className="label-title">Complete by</div>
                        <DatePicker
                            value={endDate}
                            showTimeSelect
                            onSelect={(date) => setEndDate(date)}
                            onChange={(date) => setEndDate(date)}
                        />
                    </label>
                </div>
                <div
                    className="edit-goal-form-item"
                    id="notes-input"
                    onKeyDown={handleEnter}>
                    <TextField
                        classes={{ root: textFieldClasses.root }}
                        label="Notes"
                        multiline={true}
                        variant="outlined"
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
            </div>
            <div id="edit-goal-btn-container">
                <Button
                    classes={{ root: cancelBtnClasses.root }}
                    onClick={closeForm}
                >
                    Cancel
                </Button>
                <Button
                    classes={{ root: classes.root }}
                    variant="contained"
                    onClick={deleteGoal}
                >
                    DELETE
                </Button>
                <Button
                    classes={{ root: classes.root }}
                    variant="contained"
                    onClick={onSubmit}
                >
                    SAVE CHANGES
                </Button>
            </div>
        </div>
    );
};

export default withRouter(EditGoal)
