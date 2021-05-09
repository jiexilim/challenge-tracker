import { useHistory } from "react-router-dom";
import { useAuth } from "../Auth/ProvideAuth";

const SignoutButton = props => {
    let history = useHistory();
    let auth = useAuth();

    return auth.access ? (
        <p>
            <button
                onClick={() => {
                    auth.signout(() => history.push("/"));
                }} 
                className="btn btn-block"
            >
                Sign out
        </button>
        </p>
    ) : (
        <p></p>
    );
}

export default SignoutButton

