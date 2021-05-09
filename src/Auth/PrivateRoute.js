import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./ProvideAuth"


const PrivateRoute = ({ component: Component, ...rest }) => {
  let auth = useAuth();
  return (

    <Route
      {...rest}
      render={({ location }) =>
        auth.access ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute
