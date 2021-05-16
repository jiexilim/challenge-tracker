import React from "react"
import { Link, withRouter } from "react-router-dom";
import { useAuth } from "../Auth/ProvideAuth";

const LoginButton = ({history}) => {
    const userAccess = localStorage.getItem("userAccess");
    const auth = useAuth();

    const onClick = async () => {
        userAccess ? history.push("/") : history.push("/login")
	}
  
    return ! userAccess ? (
        <li className="nav-item"><Link className="nav-link" onClick={ onClick }>Log in</Link></li>
    ) : (
        null
    );
}

export default withRouter(LoginButton);
