import React, { useContext, createContext, useState } from "react";
import { useServer } from "../Server"

const axios = require("axios");

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
}

const useProvideAuth = () => {
  const serverURL = useServer();
  const [access, setAccess] = useState(null);

    const signin = (username, password, next) => {
        return axios.post(serverURL + "/user/login", { username, password })
            .then(res => {
                if (res.data.accessToken) {
                    localStorage.setItem('userAccess', res.data.accessToken)
                    setAccess(localStorage.getItem('userAccess'))
                    next();
                } else {
                    alert(res.data);
                }
                console.log(res.data)
            })
    };

  const signout = (next) => {
      setAccess(null);
      next();
  };

  return {
    access,
    signin,
    signout
  };
}
