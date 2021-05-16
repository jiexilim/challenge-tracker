import React from "react"
import { Link } from "react-router-dom";
import SignoutButton from "../Auth/SignoutButton"
import LoginButton from "../Auth/LoginButton"
import { useAuth } from "../Auth/ProvideAuth"

const Header = ({history}) => {
	let isAuth = useAuth()

	return (
		<div className="navbar">
			<ul className="navbar-container">
				<li className="nav-item">
					<Link to="/" className="nav-link">Home</Link>
				</li>
				<LoginButton />
				{/* {
					!localStorage.getItem('userAccess')
						? <li className="nav-item"><Link to="/" className="nav-link">Log in</Link></li>
						: null
				} */}
				{
					localStorage.getItem('userAccess')
						? <li className="nav-item"><Link to="/create-goal" className="nav-link">+ New Goal</Link></li>
						: null
				}
				<SignoutButton />
			</ul>
		</div>
	);
};

export default Header;
