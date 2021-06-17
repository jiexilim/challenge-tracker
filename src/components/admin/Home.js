import React, { useEffect } from "react"
import Dashboard from "./Dashboard"

const Home = () => {
    const userAccess = localStorage.getItem("userAccess");

    return (
        userAccess ?
            <Dashboard /> :
            <div id="front-page">
                <div id="slogan-container">
                    <h1 className="slogan">Aim, plan, execute</h1>
                    <h1 className="slogan">with this challenge tracker.</h1>
                </div>
            </div>
    )
}

export default Home
