import React, { useState } from "react"
import { useServer } from "../../Server"
const axios = require("axios")

const SignUp = ({ history }) => {
	const serverURL = useServer()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const onSubmit = async (event) => {
		event.preventDefault()

		axios.post(serverURL + "/user/register", { username, password })
			.then(res => console.log(res.data))

		setUsername("")
		setPassword("")
		history.push("/sign-in")
	};

	return (
		<div id="front-page">
			<form onSubmit={onSubmit} className="auth-form">
				<h1>Sign up</h1>
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
				<input type="submit" value="SIGN UP" className="auth-btn" />
			</form>
		</div>
	);
};

export default SignUp
