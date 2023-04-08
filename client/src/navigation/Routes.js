import { BrowserRouter as Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import Home from "../routes/Home";
import PublicRecipes from "../routes/PublicRecipes";
import Register from "../routes/Register";
import Login from "../routes/Login";
import Dashboard from "../routes/Dashboard";
import RecipeSearch from "../routes/RecipeSearch";

function Routes({ login, register, findRecipes }) {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/public-recipes">
                    <PublicRecipes />
                </Route>
                <Route exact path="/register">
                    <Register register={register} />
                </Route>
                <Route exact path="/login">
                    <Login login={login} />
                </Route>
                <PrivateRoute exact path="/dashboard">
                    <Dashboard />
                </PrivateRoute>
                <PrivateRoute exact path="/recipe-search">
                    <RecipeSearch findRecipes={findRecipes} />
                </PrivateRoute>
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default Routes;