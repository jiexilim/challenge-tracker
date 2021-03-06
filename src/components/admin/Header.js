import React, { useState } from "react"
import { Link } from "react-router-dom"
import SignOutButton from "./SignOutButton"
import SignInButton from "./SignInButton"
import CreateGoal from "../goal/CreateGoal"
import { useAuth } from "../../auth/ProvideAuth"
import ModalForm from "./ModalForm"

const Header = () => {
	useAuth()
	const userAccess = localStorage.getItem('userAccess')
	const [openForm, setOpenForm] = useState(false)

	const greeting = () => {
		const time = (new Date()).getHours()
		if (time < 12) {
			return "Good morning"
		} else if (time < 17) {
			return "Good afternoon"
		} else {
			return "Good evening"
		}
	}

	return (
		<div>
			{
				userAccess ?
					<div className="extend-nav-container">
						<div className="nav-container-afr-auth">
							<span id="greeting">
								{userAccess && greeting()}
							</span>
							<span className="nav-link-afr-auth" onClick={() => setOpenForm(true)}>+ New Goal</span>
							<SignOutButton />
						</div>
					</div>
					:
					<div className="nav-container ">
						<Link to="/" className="nav-link">Home</Link>
						<span>
							<SignInButton />
							<Link to="/sign-up" className="nav-link">Sign Up</Link>
						</span>
					</div>
			}
			<ModalForm
				openForm={openForm}
				closeForm={() => setOpenForm(false)}
				FormComponent={CreateGoal}
			/>
		</div>
	)
}

export default Header
