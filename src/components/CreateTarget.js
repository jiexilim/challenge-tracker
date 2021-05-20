import React, { useState } from "react";
import { useServer } from "../Server"
import DatePicker from 'react-date-picker'
const axios = require("axios");

const CreateTarget = ({history}) => {
    const serverURL = useServer();
	const [title, setTitle] = useState("");
    const [endDate, setEndDate] = useState(new Date());
    const goal = history.location.state.goal;

	const onSubmit = async (event) => {
        event.preventDefault();

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
                        Is there a date this Target should be completed by?
                    <br />
                        <DatePicker
                            value={endDate}
                            showTimeSelect
                            onSelect={(date) => setEndDate(date)}
                            onChange={(date) => setEndDate(date)}
                        />
                    </label>
                </div>
                <input type="submit" value="Create" className="btn btn-block" />
            </form>
        </div>
    );
}

export default CreateTarget
