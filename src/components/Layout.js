import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import PrivateRoute from "../Auth/PrivateRoute"
import { createBrowserHistory } from "history";
import Home from "./Home"
import Login from "./Login"
import SignUp from "./SignUp"
import Dashboard from "./Dashboard"
import CreateGoal from "./CreateGoal"
import Header from "./Header"
import SignoutButton from "../Auth/SignoutButton"

const history = createBrowserHistory();

const Layout = () => {
    return (
        <div>
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/sign-up" component={SignUp} />
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        <PrivateRoute exact path="/create-goal" component={CreateGoal} />
                        <Route render={() => <h1>Not found!</h1>} />
                    </Switch>
                    <SignoutButton />
                </div>
            </Router>
        </div>
    )
}

export default Layout
