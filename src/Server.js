import React, { createContext, useContext } from 'react'

//const herokuURL = "https://afternoon-badlands-24510.herokuapp.com"
const localURL = "http://localhost:5000"

const ServerContext =  createContext();

const Server = ({ children }) => {
    return (
        <ServerContext.Provider value={localURL}>
            {children}
        </ServerContext.Provider>
    )
}

export const useServer = () => {
    return useContext(ServerContext);
}

export default Server
