
import { useState } from 'react'
import { Link } from "react-router-dom";
const axios = require("axios");

const Login = props => {
	const serverURL = "https://afternoon-badlands-24510.herokuapp.com"
	const localURL = "http://localhost:5000"
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async (event) => {
		event.preventDefault();

		axios.post(localURL + "/user/login", { username, password })
			.then(res => {
				if (res.data.accessToken) {
					props.history.push("/dashboard");
				} else {
					alert(res.data);
				}
				console.log(res.data)
			});

		setUsername("");
		setPassword("");
	};
	
	return (
		<form onSubmit={onSubmit} className="form-body">
			<h1>Sign in.</h1>
			<div className="form-group">
				<input
					type="text"
					placeholder="Username"
					value={ username }
					onChange={(e) => setUsername(e.target.value)}			
				/>
			</div>
			<div className="form-group">
				<input
					type="text"
					placeholder="Password"
					value={ password }
					onChange={(e) => setPassword(e.target.value)}			
				/>
			</div>
			<input type='submit' value='Login' className="btn btn-block" />
			<br />
			<p>Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
		</form>
	);
};

export default Login;