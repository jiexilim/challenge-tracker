import React, { useState } from 'react'
import { useServer } from "../Server"
import axios from 'axios';
import DatePicker from 'react-date-picker'

const EditGoal = ({history}) => {
    const serverURL = useServer();
	const [title, setTitle] = useState(history.location.state.goal.title);
	const [description, setDescription] = useState(history.location.state.goal.description);
    const [benefit, setBenefit] = useState(history.location.state.goal.benefit);
    const [endDate, setEndDate] = useState(new Date(history.location.state.goal.endDate));
    const [goalId, setGoalId] = useState(history.location.state.goal._id);
   
	const onSubmit = async (event) => {
        event.preventDefault();

        axios.post(serverURL + "/goal/edit",
            {
                title,
                description,
                benefit,
                endDate,
                goalId: goalId
            }).then(res => console.log(res.data));

        history.push("/goal-list")
    };

    return (
        <div className="content">
            <form onSubmit={onSubmit} className="form-body">
                <h1>Edit Goal</h1>
                <div className="form-group">
                    <label>
                        Goal Name:
                    <br />
                        <input
                            type="text"
                            placeholder={title}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Description:
                    <br />
                        <input
                            type="text"
                            placeholder={description}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Benefit:
                    <br />
                        <input
                            type="text"
                            placeholder={benefit}
                            value={benefit}
                            onChange={(e) => setBenefit(e.target.value)}
                        />
                    </label>
                </div>
                <div className="form-group">
                <label>
                        Is there a date this Goal should be completed by?
                    <br />
                        <DatePicker
                            value={endDate}
                            showTimeSelect
                            onSelect={(date) => setEndDate(date)}
                            onChange={(date) => setEndDate(date)}
                        />
                    </label>
                </div>
                <input type="submit" value="Save changes" className="btn btn-block" />
            </form>
        </div>
    );
};

export default EditGoal
