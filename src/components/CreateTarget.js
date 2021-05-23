import React, { useState } from "react";
import { useServer } from "../Server"
import DatePicker from 'react-date-picker'
const axios = require("axios");

const CreateTarget = ({history}) => {
    const serverURL = useServer();
    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState(0);
    const [dateType, setDateType] = useState('wk');
    const goal = history.location.state.goal;


    const computeDate = (duration, dateType) => {
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
        return computed;
    }


	const onSubmit = async (event) => {
        event.preventDefault();
        const endDate = computeDate(duration, dateType);
        console.log(endDate)
        axios.post(serverURL + "/target/create",
            {
                title,
                endDate,
                goalId: goal._id
            }).then(res => console.log(res.data));

            history.push({
                pathname: '/target-list',
                state: { goal: goal }
            })
    };

    return (
        <div className="content">
            <form onSubmit={onSubmit} className="form-body">
                <h1>Create Target. Smaller pieces of your Goal.</h1>

                <div className="form-group">
                    <label>
                        Give your Target a name.
                    <br />
                        <input
                            type="text"
                            placeholder="Target name."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Set a duration for your Target.
                    <br />
                        <input
                            type="number"
                            placeholder="Duration."
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                        <select name="selectDate" onChange={(e) => setDateType(e.target.value)}>
                            <option value="wk">Week(s)</option>
                            <option value="mth">Month(s)</option>
                            <option value="yr">Year(s)</option>
                        </select>
                    </label>
                </div>

                <input type="submit" value="Create" className="btn btn-block" />
            </form>
        </div>
    );
}

export default CreateTarget
