import React from "react"
import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton"
import SignInButton from "./SignInButton"
import { useAuth } from "../../auth/ProvideAuth"

const Header = () => {
	useAuth()

	const greeting = () => {
		const time = (new Date()).getHours();
		if (time < 12) {
			return "Good morning";
		} else if (time < 17) {
			return "Good afternoon"
		} else {
			return "Good evening"
		}
	}

	return (
			<div className="navbar-container">
				<span id="greeting">{ localStorage.getItem('userAccess')? greeting() : null}</span>
				{
					! localStorage.getItem('userAccess')
						? <Link to="/" className="nav-link-bfr-auth">Home</Link>
						: null
				}
				<SignInButton />
				{
					localStorage.getItem('userAccess')
						? <Link to="/create-goal" className="nav-link">+ New Goal</Link>
						: null
				}
				<SignOutButton />
			</div>
	);
};

export default Header;
