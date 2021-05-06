import { useState } from "react";
import { Redirect } from 'react-router-dom';
const axios = require("axios");

const SignUp = props => {
	const serverURL = "https://afternoon-badlands-24510.herokuapp.com"
	const localURL = "http://localhost:5000"
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async (event) => {
		event.preventDefault();

		axios.post(localURL + "/user/register", { username, password })
			.then(res => console.log(res.data));

		setUsername("");
		setPassword("");
		props.history.push("/login");
	};

	return (
		<form onSubmit={onSubmit} className="form-body">
			<h1>Sign up. It's free.</h1>
			<div className="form-group">
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<input 
					type="text"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<input type="submit" value="Sign Up" className="btn btn-block" />
		</form>
	);
};

export default SignUp;
