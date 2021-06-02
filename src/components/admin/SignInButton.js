import React from "react"
import { Link, withRouter } from "react-router-dom";

const LoginButton = ({history}) => {
    const userAccess = localStorage.getItem("userAccess");

    const onClick = async () => {
        userAccess ? history.push("/") : history.push("/login")
	}
  
    return ! userAccess ? (
        <Link className="nav-link-bfr-auth" onClick={ onClick }>Sign in</Link>
    ) : (
        null
    );
}

export default withRouter(LoginButton);
