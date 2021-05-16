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

const history = createBrowserHistory();

const Layout = () => {
    return (
        <div>
            <Router history={history}>
                <div className="wrapper">
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                    <div className="left-content">
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/sign-up" component={SignUp} />
                            <PrivateRoute exact path="/create-goal" component={CreateGoal} />
                            <PrivateRoute exact path="/goal-list" component={GoalList} />
                            <Route render={() => <h1>Not found!</h1>} />
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export default Layout
