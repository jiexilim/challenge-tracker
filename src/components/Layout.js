import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { createBrowserHistory } from "history";
import PrivateRoute from "../Auth/PrivateRoute"
import Home from "./Home"
import Login from "./Login"
import SignUp from "./SignUp"
import CreateGoal from "./CreateGoal"
import Header from "./Header"
import Sidebar from "./Sidebar"
import GoalList from "./GoalList"
import EditGoal from "./EditGoal"
import { useAuth } from "../Auth/ProvideAuth"


const history = createBrowserHistory();

const Layout = () => {
    useAuth();
    return (
        <div>
            <Router history={history}>
                <div className="wrapper">
                    <Sidebar />
                    <div className={ localStorage.getItem("userAccess") ? "left-content": "left-content-bfr-auth" }>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/sign-up" component={SignUp} />
                            <PrivateRoute exact path="/create-goal" component={CreateGoal} />
                            <PrivateRoute exact path="/goal-list" component={GoalList} />
                            <PrivateRoute exact path="/edit-goal" component={EditGoal} />
                            <Route render={() => <h1>Not found!</h1>} />
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export default Layout
