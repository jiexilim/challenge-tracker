import React from "react"
import Layout from "./Layout";
import { ProvideAuth } from "./auth/ProvideAuth"
import ServerContext from "./Server"

const App = () => {
	return (
		<div className="App">
			<ServerContext>
				<ProvideAuth>
					<Layout />
				</ProvideAuth>
			</ServerContext>
		</div>
	);
};

export default App;
