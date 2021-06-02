import React, { useState } from "react";
import { useServer } from "../../Server"
import DatePicker from 'react-date-picker'
import InputTag from "./InputTag"
import SetSmallMilestone from "../target/SetSmallMilestone"
import TempMileStone from "../target/TempMileStone"
const jwt = require("jsonwebtoken")
const axios = require("axios");

export const computeDate = (duration, dateType) => {
    const currDate = new Date();
    const dd = currDate.getDate();
    const mm = currDate.getMonth();
    const yyyy = currDate.getFullYear();
    let durInDays = 0
    if (dateType === "wk") {
        durInDays = 7;
    } else if (dateType === "mth") {
        durInDays = 31;
    } else {
        durInDays = 365;
    }
    const computed = new Date(yyyy, mm, dd + (duration * durInDays));
    return computed.toString();
}

const CreateGoal = ({ history }) => {
    const serverURL = useServer();
    const [title, setTitle] = useState("");
    const [benefit, setBenefit] = useState("");
    const [endDate, setEndDate] = useState(new Date());
    const [tags, setTags] = useState([]);
    const [showAddMilestone, setShowAddMilestone] = useState(false);
    const [milestones, setMilestones] = useState([]);
    const [goalId, setGoalId] = useState("")

    const auth = localStorage.getItem("userAccess");
    const decoded = jwt.decode(auth);

    const handleFieldChange = (inputTags) => {
        setTags(inputTags);
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            return false;
        }
    }

    const deleteMilestone = (id) => {
        const newMileStones = milestones.filter((milestone) => milestone.id !== id)
        setMilestones(newMileStones);
    }

    const setMilestone =  (targetTitle, duration, dateType) => {
        setShowAddMilestone(false)
        const id = Math.floor(Math.random() * 10000) + 1
        const newMilestone = { id: id, title: targetTitle, endDate: computeDate(duration, dateType) };
        setMilestones([...milestones, newMilestone]);
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        axios.post(serverURL + "/goal/create",
            {
                title,
                benefit,
                endDate,
                tags,
                userId: decoded.id
            }).then(res => {
                console.log(res.data.msg)
                const goalId = res.data.goalId;
                if (milestones.length > 0) {
                    for (let milestone of milestones) {
                        milestone['goalId'] = goalId;
                    }
                    axios.post(serverURL + "/target/create", milestones).then(res => console.log(res.data));
                }
            });
        history.push("/")
    };

    return (
        <div className="content">
            <form onSubmit={onSubmit} className="form-body">
                <h1>Set Goals. Track progress.</h1>
                <div className="form-group" onKeyDown={handleEnter}>
                    <label>
                        <h3>What is your goal? Be specific.</h3>
                        <p>The strategy to attain $100,000 per month is different
                            from the strategy to attain $10,000 per month.</p>
                        <input
                            type="text"
                            placeholder="Your goal"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                </div>

                <div className="form-group" onKeyDown={handleEnter}>
                    <label>
                        <h3>Why do you want to set this goal?</h3>
                        <p>People tend to get distracted by other things in life
                            and forget about the reason of setting the goal in the first place.</p>
                        <input
                            type="text"
                            placeholder="The reason"
                            value={benefit}
                            onChange={(e) => setBenefit(e.target.value)}
                        />
                    </label>
                </div>

                <div className="form-group" onKeyDown={handleEnter}>
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

                <div className="form-group" onKeyDown={handleEnter}>

                    <h3>Do you want to break your goal into smaller milestones?</h3>
                    <p>A goal is no easy task. Each small milestone contributes to the larger success.</p>
                    {
                        milestones.map((milestone, index) => <TempMileStone key={index} milestone={milestone} onDelete={deleteMilestone} />)
                    }
                    <button className="sub-btn" type="button" onClick={() => setShowAddMilestone(true)}>Add Small Milestone</button>
                    {showAddMilestone && <SetSmallMilestone onSet={setMilestone} />}

                </div>

                <div className="form-group">
                    <label>
                        <h3>You may add up to 5 tags to describe your goal.</h3>
                        <InputTag onChange={handleFieldChange} />
                    </label>
                </div>
                <input type="submit" value="Create" className="btn" />
            </form>
        </div>
    );
};

export default CreateGoal
