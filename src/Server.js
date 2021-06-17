import React, { createContext, useContext } from 'react'

// const serverURL = "https://afternoon-badlands-24510.herokuapp.com"
const serverURL = "http://localhost:5000"

const ServerContext = createContext();

const Server = ({ children }) => {
    return (
        <ServerContext.Provider value={serverURL}>
            {children}
        </ServerContext.Provider>
    )
}

export const useServer = () => {
    return useContext(ServerContext);
}

export default Server
