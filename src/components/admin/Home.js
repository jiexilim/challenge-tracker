import React from "react"
import Dashboard from "./Dashboard"

const Home = () => {
    const userAccess = localStorage.getItem("userAccess");

    return (
            userAccess 
                ? <Dashboard />
                : <h1 id="slogan">Aim, plan, execute,<br /> with this challenge tracker.</h1>
            
    )
}

export default Home
