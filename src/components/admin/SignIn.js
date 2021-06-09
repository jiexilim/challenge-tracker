
import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../auth/ProvideAuth"

const SignIn = ({ history }) => {
	let location = useLocation()
	let { from } = location.state || { from: { pathname: "/" } }
	let auth = useAuth()

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const onSubmit = async (event) => {
		event.preventDefault()
		auth.signin(username, password, () => history.replace(from))
	}

	return (
		<form onSubmit={onSubmit} className="auth-form">
			<h1>Sign in</h1>
			<div>
				<label>
					Username
					<input
						className="auth-input"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
			</div>
			<div>
				<label>
					Password
					<input
						className="auth-input"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
			</div>
			<input type='submit' value='SIGN IN' className="auth-btn" />
			<p>Don't have an account? <Link to="/sign-up" className="white-link">   Sign Up</Link></p>
		</form>
	)
}

export default SignIn