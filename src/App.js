import Layout from "./components/Layout";
import { ProvideAuth } from "./Auth/ProvideAuth"
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
