import { useState } from "react";

const SignUp = () => {
	const serverURL = "https://afternoon-badlands-24510.herokuapp.com/"
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();

		const result = await fetch(serverURL + "/user/register", {
			method: "POST",
			header: {
				"Content-Typoe": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		}).then((res) => res.json());

		if (result.status === 'ok') {

		} else {
			alert(result.error);
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<div>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<input
					type="text"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<input type="submit" value="Sign Up" />
		</form>
	);
};

export default SignUp;
