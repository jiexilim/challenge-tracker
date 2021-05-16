import React from "react"
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userAccess = localStorage.getItem("userAccess");
  return (

    <Route
      {...rest}
      render={(props) =>
        userAccess  ? (
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
