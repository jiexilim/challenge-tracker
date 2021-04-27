import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/log-in">Log in</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
