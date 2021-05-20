import React, { useState } from 'react'
import { useServer } from "../Server"
import axios from 'axios';
import DatePicker from 'react-date-picker'

const EditTarget = ({history}) => {
    const serverURL = useServer();
	const [title, setTitle] = useState(history.location.state.target.title);
    const [endDate, setEndDate] = useState(new Date(history.location.state.target.endDate));
    const isCompleted = history.location.state.target.isCompleted;
    const targetId = history.location.state.target._id;
   
	const onSubmit = async (event) => {
        event.preventDefault();

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

export default EditTarget
