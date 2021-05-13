
import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Auth/ProvideAuth";

const Login = ({ history }) => {
	let location = useLocation();
	let { from } = location.state || { from: { pathname: "/" } };
	let auth = useAuth();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async (event) => {
		event.preventDefault();
		auth.signin(username, password, () => history.replace(from))
	}

	return (
		<form onSubmit={onSubmit} className="form-body">
			<h1>Sign in.</h1>
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
			<input type='submit' value='Login' className="btn btn-block" />
			<br />
			<p>Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
		</form>
	);
};

export default Login;