
import { useState } from 'react'

const appName = 'Challenge Tracker'

const Login = () => {
	const [userName, setUserName] = useState('')
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
					value={ userName }
					onChange={(e) => setUserName(e.target.value)}			
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
		</form>
	);
};

export default Login;