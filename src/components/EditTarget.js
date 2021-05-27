import React, { useState } from 'react'
import { useServer } from "../Server"
import axios from 'axios';
import { computeDate } from "./CreateTarget"
import DatePicker from 'react-date-picker'

const EditTarget = ({history}) => {
    const serverURL = useServer();
	const [title, setTitle] = useState(history.location.state.target.title);
    const [duration, setDuration] = useState(0);
    const [dateType, setDateType] = useState('wk');
    const isCompleted = history.location.state.target.isCompleted;
    const targetId = history.location.state.target._id;
   
	const onSubmit = async (event) => {
        event.preventDefault();
        event.preventDefault();
        const endDate = computeDate(duration, dateType);
        axios.post(serverURL + "/target/edit",
            {
                title,
                endDate,
                isCompleted,
                targetId: targetId
            }).then(res => console.log(res.data));

        history.push("/target-list")
    };

    return (
        <div className="content">
            <form onSubmit={onSubmit} className="form-body">
                <h1>Edit Target</h1>
                <div className="form-group">
                    <label>
                        Target Name:
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
                <input type="submit" value="Save changes" className="btn btn-block" />
            </form>
        </div>
    );
};

export default EditTarget
