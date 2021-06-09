import React from "react"
import { Link, withRouter } from "react-router-dom"

const LoginButton = ({ history }) => {
    const userAccess = localStorage.getItem("userAccess")

    const onClick = async () => {
        userAccess ? history.push("/") : history.push("/sign-in")
    }

    return !userAccess && <Link className="nav-link" onClick={onClick}>Sign in</Link>
        
}

export default withRouter(LoginButton)
