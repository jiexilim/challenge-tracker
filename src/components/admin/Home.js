import React from "react"
import Dashboard from "./Dashboard"

const Home = () => {
    const userAccess = localStorage.getItem("userAccess");

    return (
        <div className="content">
            {
                userAccess 
                ? <Dashboard />
                : <h1>Aim, plan, execute,<br /> with this challenge tracker.</h1>
            }
        </div>
    )
}

export default Home
