import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt from "jsonwebtoken";
import useLocalStorage from "./helpers/useLocalStorage";
import RecipeApi from "./helpers/api";
import Navigation from "./navigation/Navigation";
import PrivateRoute from "./navigation/PrivateRoute";
import Home from "./routes/Home";
import PublicRecipes from "./routes/PublicRecipes";
import Register from "./routes/Register";
import Login from "./routes/Login";
import RecipePage from "./routes/RecipePage";
import Dashboard from "./routes/Dashboard";
import RecipeSearch from "./routes/RecipeSearch";
import RecipeEdit from "./routes/RecipeEdit";
import RecipeNew from "./routes/RecipeNew";

// Key name for storing token in localStorage
export const TOKEN_STORAGE_ID = "recipe-app-token"

export const UserContext = createContext();
export const RecipesContext = createContext();

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [recipes, setRecipes] = useState(null);
    const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

    // whenever the token changes, setCurrentUser
    useEffect(async function checkUser() {
        if (token) {
            try {
                let { username } = jwt.decode(token);
                // put the token on the Api class so it can use it when calling the API.
                RecipeApi.token = token;
                let correctUser = await RecipeApi.getCurrentUser(username);
                setCurrentUser(correctUser);
            } catch (err) {
                console.error("Problem checking user", err);
                setCurrentUser(null);
            }
        }
    }, [token]);

    function logout() {
        setCurrentUser(null);
        setToken(null);
    }

    async function register(data) {
        try {
            let token = await RecipeApi.register(data);
            setToken(token);
            return { success: true };
        } catch (err) {
            console.error("Registration failed", err);
            return { success: false, err };
        }
    }

    async function login(data) {
        try {
            let token = await RecipeApi.login(data);
            setToken(token);
            return { success: true };
        } catch (err) {
            console.error("Login failed", err);
            return { success: false, err };
        }
    }

    async function editRecipe(id, data) {
        try {
            let recipe = await RecipeApi.updateRecipe(id, data);
            return { success: true };
        } catch (err) {
            console.error("Update failed", err);
            return { success: false, err };
        }
    }

    async function addRecipe(data) {
        try {
            let recipe = await RecipeApi.addRecipe(data);
            return { success: true, recipeId: recipe.id };
        } catch (err) {
            console.error("Update failed", err);
            return { success: false, err };
        }
    }

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ currentUser, setCurrentUser }}>
                <RecipesContext.Provider value={{ recipes, setRecipes }}>
                    <Navigation logout={logout} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="recipes">
                            <Route path="public" element={<PublicRecipes />} />
                            <Route path=":id" element={<RecipePage />} />
                            <PrivateRoute path="search" element={<RecipeSearch />} />
                            <PrivateRoute path="add" element={<RecipeNew addRecipe={addRecipe} />} />
                            <PrivateRoute path="edit/:id" element={<RecipeEdit editRecipe={editRecipe} />} />
                        </Route>
                        <Route path="user">
                            <Route path="register" element={<Register register={register} />} />
                            <Route path="login" element={<Login login={login} />} />
                            <PrivateRoute path="dashboard" element={<Dashboard />} />
                        </Route>
                    </Routes>
                </RecipesContext.Provider>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
