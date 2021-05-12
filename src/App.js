import React from "react";
import Layout from "./components/Layout";
import Header from "./components/Header";
import { ProvideAuth } from "./Auth/ProvideAuth"
import SignoutButton from "./Auth/SignoutButton"


const App = () => {
	return (
		<div className="App">
			<ProvideAuth>
				<Layout />
			</ProvideAuth>
		</div>
	);
};

export default App;
