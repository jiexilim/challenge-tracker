import React, { useState, useEffect } from "react";
import { useServer } from "../Server"
import Goal from "./Goal"
const jwt = require("jsonwebtoken")
const axios = require("axios");

const GoalList = ({history}) => {
    const serverURL = useServer();
    const [goals, setGoals] = useState([])

    const auth = localStorage.getItem("userAccess");
    const decoded = jwt.decode(auth);

    useEffect(() => {
        axios.get(serverURL + "/goal/",
            { params: { userId: decoded.id } })
            .then(res => setGoals(res.data))
            .catch(err => console.log(err))
    })

    const deleteGoal = async (id) => {
        axios.delete(serverURL + "/goal/delete", 
        { data: { goalId: id } })
        .then(res => {
            setGoals(goals.filter((goal) => goal._id !== id));
            console.log(res.data);
        })
        .catch(err => console.log(err))
    }

    const editGoal = async (goal) => {
        history.push({
            pathname: '/edit-goal',
            state: { goal: goal }
        })
    }

    return (
        <div className="content">
            <h1>Goal List</h1>
            <div className="goal-list">
                {
                    goals.map((goal, index) => (
                        <Goal
                            key={index}
                            goal={goal}
                            onDelete={deleteGoal}
                            onEdit={editGoal}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default GoalList
