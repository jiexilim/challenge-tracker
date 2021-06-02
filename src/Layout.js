import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { createBrowserHistory } from "history";
import PrivateRoute from "./auth/PrivateRoute"
import Home from "./components/admin/Home"
import Login from "./components/admin/SignIn"
import SignUp from "./components/admin/SignUp"
import CreateGoal from "./components/goal/CreateGoal"
import Header from "./components/admin/Header"
import Sidebar from "./components/admin/Sidebar"
import EditGoal from "./components/goal/EditGoal"
import TargetList from "./components/target/TargetList"
import EditTarget from "./components/target/EditTarget"
import { useAuth } from "./auth/ProvideAuth"


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
                            <PrivateRoute exact path="/edit-goal" component={EditGoal} />
                            <PrivateRoute exact path="/target-list" component={TargetList} />
                            <PrivateRoute exact path="/edit-target" component={EditTarget} />
                            <Route render={() => <h1>Not found!</h1>} />
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export default Layout
