import { withRouter } from "react-router-dom";
import { useAuth } from "../Auth/ProvideAuth";

const SignoutButton = ({history}) => {
    let auth = useAuth();

    const onClick = async () => {
        auth.signout(() => history.push('/'))
	}
  

    return auth.access ? (
        <p>
            <button
                onClick={ onClick } 
                className="btn btn-block"
            >
                Sign out
        </button>
        </p>
    ) : (
        <p></p>
    );
}

export default withRouter(SignoutButton);

