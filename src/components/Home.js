import React from "react"
import Dashboard from "./Dashboard"

const Home = () => {
    const userAccess = localStorage.getItem("userAccess");

    return (
        <div className="content">
            {
                userAccess 
                ? <Dashboard />
                : <h1>Your personalised challenge tracker.</h1>
            }
        </div>
    )
}

export default Home
