import { Link } from "react-router-dom";
import { useAuth } from "../Auth/ProvideAuth";

const Header = () => {
	let auth = useAuth();

	return (
		<header>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						{
							! auth.access ? <li><Link to="/dashboard">Log in</Link></li> : null
						}
						{
							auth.access ? <li><Link to="/create-goal">+ New Goal</Link></li> : null
						}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
