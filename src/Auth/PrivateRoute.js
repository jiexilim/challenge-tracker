import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./ProvideAuth"


const PrivateRoute = ({ component: Component, ...rest }) => {
  let auth = useAuth();
  return (

    <Route
      {...rest}
      render={(props) =>
        auth.access ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute
