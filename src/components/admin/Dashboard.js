import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom"
import { useServer } from "../../Server"
import Goal from "../goal/Goal"
const jwt = require("jsonwebtoken")
const axios = require("axios");

const Dashboard = ({history}) => {
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

    const accessGoal = async (goal) => {
        localStorage.setItem('currentGoal', JSON.stringify(goal))
        history.push('/target-list')
    }

    if (goals.length === 0) {
        return (
            <div className="content">
                <button onClick={() => history.push('/create-goal')}>Create Goal</button>
            </div >
        )
    } else {

        return (
            <div>
                <div className="goal-list">
                    {
                        goals.map((goal, index) => (
                            <Goal
                                key={index}
                                goal={goal}
                                onDelete={deleteGoal}
                                onEdit={editGoal}
                                onAccess={accessGoal}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Dashboard)
