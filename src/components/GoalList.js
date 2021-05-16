import React, { useState, useEffect } from "react";
import { useServer } from "../Server"
const jwt = require("jsonwebtoken")
const axios = require("axios");


const GoalList = () => {
    const serverURL = useServer();
    const [goals, setGoals] = useState([])

    const auth = localStorage.getItem("userAccess");
    const decoded = jwt.decode(auth);

    useEffect(() => {
        axios.get(serverURL + "/goal/",
            { params: { userId: decoded.id } })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="content">
            Goallist
        </div>
    )
}

export default GoalList
