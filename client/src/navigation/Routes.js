import { BrowserRouter as Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";

function Routes() {
    return (
        <div>
            <Switch>
                <Route exact path="/"></Route>
                <Route exact path="/public-recipes"></Route>
                <Route exact path="/register"></Route>
                <Route exact path="/login"></Route>
                <PrivateRoute exact path="/dashboard"></PrivateRoute>
                <PrivateRoute exact path="/recipe-search"></PrivateRoute>
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default Routes;