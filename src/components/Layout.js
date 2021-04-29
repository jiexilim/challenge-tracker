import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from "./Home.js"
import Login from "./Login.js"
import SignUp from "./SignUp.js"

const Layout = () => {
    return (
        <div>
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/sign-up" component={SignUp} />
                        <Route render={() => <h1>Not found!</h1>} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default Layout
