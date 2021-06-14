import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { createBrowserHistory } from "history";
import PrivateRoute from "./auth/PrivateRoute"
import Home from "./components/admin/Home"
import SignIn from "./components/admin/SignIn"
import SignUp from "./components/admin/SignUp"
import Header from "./components/admin/Header"
import Sidebar from "./components/admin/Sidebar"
import GoalView from "./components/goal/GoalView"
import { useAuth } from "./auth/ProvideAuth"

const history = createBrowserHistory();

const Layout = () => {
    useAuth()
    return (
        <div>
            <Router history={history}>
                <div className="wrapper">
                    <Sidebar />
                    <div className={localStorage.getItem("userAccess") ? "left-content" : "left-content-bfr-auth"}>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/sign-in" component={SignIn} />
                            <Route exact path="/sign-up" component={SignUp} />
                            <PrivateRoute path="/goal/:id" component={GoalView} />
                            <Route render={() => <h1>Eror 404</h1>} />
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export default Layout
