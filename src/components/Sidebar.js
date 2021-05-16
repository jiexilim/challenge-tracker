import React from 'react'
import { Link } from "react-router-dom"

const Sidebar = () => {
    return (
        <div className="sidebar">
             <ul>
            <li className="sidebar-item"><Link to="/goal-list" className="sidebar-link">Goal List</Link></li>
        </ul>  
        </div>
    )
}

export default Sidebar
