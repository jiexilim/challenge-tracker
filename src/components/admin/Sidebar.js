import React from 'react'
import { Link } from "react-router-dom"
import { useAuth } from "../../auth/ProvideAuth"
import { AiFillHome } from "react-icons/ai"

const Sidebar = () => {
    useAuth()

    return (
        localStorage.getItem('userAccess') ?
            (<div className="sidebar">
                <ul>
                    <li className="sidebar-item"><Link to="/" className="sidebar-link"><AiFillHome /></Link></li>
                </ul>
            </div>) : null
    )
}

export default Sidebar
