import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home.js";
import Login from "./Login.js";

const Header = () => {
	return (
		<header>
			<h1>Challenge Tracker</h1>
			<Router>
				<div>
					<nav>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/login">Login</Link>
							</li>
						</ul>
					</nav>
					<Switch>
						<Route exact path="/" component={Home} />
                        <Route exact path="/login"component={Login} />
					</Switch>
				</div>
			</Router>
			;
		</header>
	);
};

export default Header;
