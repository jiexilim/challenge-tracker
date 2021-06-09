import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import { useServer } from "../../Server"
import { handleEnter, blueButton, createGoalInput } from "../../functions"
import { Button, TextField } from "@material-ui/core"
import InputTag from "./InputTag"
import DatePicker from 'react-date-picker'
import jwt from "jsonwebtoken"
import axios from "axios"

const CreateGoal = ({ history, closeForm }) => {
    const serverURL = useServer()
    const classes = blueButton()
    const inputClasses = createGoalInput()
    const [name, setName] = useState("")
    const [benefit, setBenefit] = useState("")
    const [endDate, setEndDate] = useState(new Date())
    const [notes, setNotes] = useState("")
    const [tags, setTags] = useState([])

    const decoded = jwt.decode(localStorage.getItem("userAccess"))

    const handleFieldChange = (inputTags) => {
        setTags(inputTags)
    };

    const onSubmit = () => {
        console.log(typeof endDate)
        axios.post(serverURL + "/goal/create",
            {
                name,
                benefit,
                endDate,
                tags,
                userId: decoded.id
            }).then(res => {
                console.log(res.data)
                history.push(`/goal/${res.data.goalId}`)
            });
    }

    return (
        <div>
            <h2 id="create-goal-form-title">Set Goals. Track progress.</h2>
            <div className="create-goal-form-item" onKeyDown={handleEnter}>
                <label>
                    <h3>What is your goal? Be specific.</h3>
                    <p>The strategy to attain $100,000 per month is different
                            from the strategy to attain $10,000 per month.</p>
                    <TextField
                        id="outlined-basic"
                        classes={{ root: inputClasses.root }}
                        label="Goal name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
            </div>
            <div className="create-goal-form-item" onKeyDown={handleEnter}>
                <label>
                    <h3>Why do you want to set this goal?</h3>
                    <p>People tend to get distracted by other things in life
                            and forget about the reason of setting the goal in the first place.</p>
                    <TextField
                        id="outlined-basic"
                        classes={{ root: inputClasses.root }}
                        label="Purpose of the goal"
                        variant="outlined"
                        value={benefit}
                        onChange={(e) => setBenefit(e.target.value)}
                    />
                </label>
            </div>
            <div className="create-goal-form-item" onKeyDown={handleEnter}>
                <label>
                    <h3>Set an endpoint for your goal.</h3>
                    <p>When you set a date you provide the pressure necessary to get moving and start making things happen.</p>
                    <DatePicker
                        value={endDate}
                        showTimeSelect
                        onSelect={(date) => setEndDate(date)}
                        onChange={(date) => setEndDate(date)}
                    />
                </label>
            </div>
            <div className="create-goal-form-item" onKeyDown={handleEnter}>
                <label>
                    <h3>You may wish to add any type of additional information about your goal.</h3>
                    <p>They can be links to any websites, peoples, knowledge relating to the goal, etc.</p>
                    <textarea
                        placeholder="Your notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={5}
                        cols={50}
                    />
                </label>
            </div>
            <div className="create-goal-form-item">
                <label>
                    <h3>You may add up to 5 tags to describe your goal.</h3>
                    <InputTag onChange={handleFieldChange} />
                </label>
            </div>
            <Button
                classes={{ root: classes.root }}
                variant="contained"
                onClick={() => {
                    closeForm()
                    onSubmit()
                }}
            >
                CREATE
                </Button>
        </div>
    )
}

export default withRouter(CreateGoal)
