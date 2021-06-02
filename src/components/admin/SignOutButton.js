import React from "react"
import { Link, withRouter } from "react-router-dom";
import { useAuth } from "../../auth/ProvideAuth";

const SignoutButton = ({history}) => {
    const userAccess = localStorage.getItem("userAccess");
    const auth = useAuth();

    const onClick = async () => {
        localStorage.clear();
        auth.signout(() => history.push('/'))
	}
  

    return userAccess ? (
        <Link className="nav-link" onClick={ onClick }>Sign out</Link>
    ) : (
        null
    );
}

export default withRouter(SignoutButton);

