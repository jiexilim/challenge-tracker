import { useContext, createContext, useState } from "react";

const axios = require("axios");

const serverURL = "https://afternoon-badlands-24510.herokuapp.com"
const localURL = "http://localhost:5000"

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
  const [access, setAccess] = useState(null);

    const signin = (username, password, next) => {
        return axios.post(localURL + "/user/login", { username, password })
            .then(res => {
                if (res.data.accessToken) {
                    setAccess(res.data.accessToken)
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