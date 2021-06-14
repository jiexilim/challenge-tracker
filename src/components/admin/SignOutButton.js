import React from "react"
import { withRouter } from "react-router-dom"
import { useAuth } from "../../auth/ProvideAuth"

const SignoutButton = ({ history }) => {
    const auth = useAuth()
    const userAccess = localStorage.getItem("userAccess")

    const onClick = async () => {
        localStorage.clear()
        auth.signout(() => history.push('/'))
    }

    return userAccess && <span className="nav-link-afr-auth" onClick={onClick}>Sign out</span>
}

export default withRouter(SignoutButton)

