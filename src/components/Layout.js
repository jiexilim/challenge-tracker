import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from "./home.js"
import Login from "./login.js"

const Layout = () => {
    return (
        <div>
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/log-in" component={Login} />
                        <Route render={() => <h1>Not found!</h1>} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default Layout
