import React, { useState } from "react";
import { useServer } from "../Server"
import { useAuth } from "../Auth/ProvideAuth"
import DatePicker from 'react-date-picker'
const jwt = require("jsonwebtoken")
const axios = require("axios");

const CreateGoal = ({ history }) => {
	const serverURL = useServer();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
    const [benefit, setBenefit] = useState("");
    const [endDate, setEndDate] = useState(new Date());

    const auth = useAuth();
    const decoded = jwt.decode(auth.access);

	const onSubmit = async (event) => {
        event.preventDefault();

        axios.post(serverURL + "/goal/create",
            {
                title,
                description,
                benefit,
                endDate,
                userId: decoded.id
            }).then(res => console.log(res.data));

        //history.push("/create-goal")
    };

    return (
        <div className="content">
            <form onSubmit={onSubmit} className="form-body">
                <h1>Create Goals. Track progress.</h1>
                <div className="form-group">
                    <label>
                        Give your Goal a name.
                    <br />
                        <input
                            type="text"
                            placeholder="Goal name."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Describe it and how it should be achieved. Be specific.
                    <br />
                        <input
                            type="text"
                            placeholder="A short description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Why do you want to set this Goal?
                    <br />
                        <input
                            type="text"
                            placeholder="The benefits upon completion"
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
                <input type="submit" value="Create" className="btn btn-block" />
            </form>
        </div>
    );
};

export default CreateGoal
