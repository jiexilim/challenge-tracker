import React, { useEffect } from "react"
import Dashboard from "./Dashboard"

const Home = () => {
    const userAccess = localStorage.getItem("userAccess");

    useEffect(() => {
    }, [])

    return (
        userAccess
            ? <Dashboard />
            : <h1 id="slogan">Aim, plan, execute,<br /> with this challenge tracker.</h1>

    )
}

export default Home
