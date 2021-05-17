import React from 'react'
import { Link } from "react-router-dom"
import { useAuth } from "../Auth/ProvideAuth"

const Sidebar = () => {
    useAuth()

    return (
        localStorage.getItem('userAccess') ?
            (<div className="sidebar">
                <div className="sidebar">
                    <ul>
                        <li className="sidebar-item"><Link to="/goal-list" className="sidebar-link">Goal List</Link></li>
                    </ul>
                </div>
            </div>) : null
    )
}

export default Sidebar
