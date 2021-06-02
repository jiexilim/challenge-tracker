import React, { useState, useEffect } from "react";
import { useServer } from "../../Server"
import Target from "./Target"
const axios = require("axios");

const TargetList = ({history}) => {
    const goal = JSON.parse(localStorage.getItem('currentGoal'));
    const serverURL = useServer();
    const [targets, setTargets] = useState([])
    const [numOfTargets, setNumOfTargets] = useState();
    const [progress, setProgress] = useState();

    useEffect(() => {
        axios.get(serverURL + "/target/",
            { params: { goalId: goal._id } })
            .then(res => setTargets(res.data))
            .catch(err => console.log(err))
        
        setNumOfTargets(targets.length)
        setProgress(targets.filter((target) => target.isCompleted).length)
    })

    const deleteTarget = async (id) => {
        axios.delete(serverURL + "/target/delete", 
        { data: { targetId: id } })
        .then(res => {
            setTargets(targets.filter((target) => target._id !== id));
            console.log(res.data);
        })
        .catch(err => console.log(err))
    }

    const editTarget = async (target) => {
        history.push({
            pathname: '/edit-target',
            state: { target: target }
        })
    }

    const checkTarget = async (target) => {
        axios.post(serverURL + "/target/edit",
            {
                title: target.title,
                endDate: target.endDate,
                isCompleted: ! (target.isCompleted),
                targetId: target._id
            }).then(res => console.log(res.data));
    }

    return (

        <div className="content">
            <h1>{goal.title}</h1>
            <h1>Progress: {progress} / {numOfTargets}</h1>
            <h1>
            {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit', day: '2-digit'
            }).format(new Date(goal.endDate))}
            </h1>
            <button onClick={() => {
                history.push({
                    pathname: '/create-target',
                    state: { goal: goal }
                })
            }}> + Add </button>
            <div>
                {
                    targets.map((target, index) => (
                        <Target
                            key={index}
                            target={target}
                            onDelete={deleteTarget}
                            onEdit={editTarget}
                            onCheck={checkTarget}
                        />
                    ))
                }
            </div>
        </div>
    
    )
}

export default TargetList