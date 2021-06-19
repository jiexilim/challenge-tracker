import React from 'react'
import { Link } from "react-router-dom"
import { useAuth } from "../../auth/ProvideAuth"
import { AiFillHome, AiFillCalendar } from "react-icons/ai"

const Sidebar = () => {
    useAuth()

    return (
        localStorage.getItem('userAccess') &&
        (<div className="sidebar">
            <div className="sidebar-item"><Link to="/" className="sidebar-link"><AiFillHome size={55} /></Link></div>
            <div className="sidebar-item"><Link to="/calendar" className="sidebar-link"><AiFillCalendar size={55} /></Link></div>
        </div>)
    )
}

export default Sidebar
