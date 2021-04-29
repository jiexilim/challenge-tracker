
import { useState } from 'react'
import { Link } from "react-router-dom";

const appName = 'Challenge Tracker'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const onSubmit = (e) => {
		e.preventDefault()

		console.log('login!')
	}
	
	return (
		<form onSubmit={onSubmit}>
			<h1>{ appName }</h1>
			<div>
				<input
					type="text"
					placeholder="Username"
					value={ username }
					onChange={(e) => setUsername(e.target.value)}			
				/>
			</div>
			<div>
				<input
					type="text"
					placeholder="Password"
					value={ password }
					onChange={(e) => setPassword(e.target.value)}			
				/>
			</div>
			<input type='submit' value='Login' />
			<br />
			<p>Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
		</form>
	);
};

export default Login;