import { BrowserRouter as Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import Home from "../routes/Home";
import PublicRecipes from "../routes/PublicRecipes";
import Register from "../routes/Register";
import Login from "../routes/Login";
import RecipePage from "../routes/RecipePage";
import Dashboard from "../routes/Dashboard";
import RecipeSearch from "../routes/RecipeSearch";
import RecipeEdit from "../routes/RecipeEdit";
import RecipeNew from "../routes/RecipeNew";

function Routes({ login, register, editRecipe, addRecipe }) {
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
                <Route exact path="/recipe/:id">
                    <RecipePage />
                </Route>
                <PrivateRoute exact path="/dashboard">
                    <Dashboard />
                </PrivateRoute>
                <PrivateRoute exact path="/recipe-search">
                    <RecipeSearch />
                </PrivateRoute>
                <PrivateRoute exact path="/recipe-edit/:id">
                    <RecipeEdit editRecipe={editRecipe} />
                </PrivateRoute>
                <PrivateRoute exact path="/recipe-add/">
                    <RecipeNew addRecipe={addRecipe} />
                </PrivateRoute>
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default Routes;