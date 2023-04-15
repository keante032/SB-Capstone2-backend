import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import jwt from "jsonwebtoken";
import useLocalStorage from "./helpers/useLocalStorage";
import RecipeApi from "./helpers/api";
import Navigation from "./navigation/Navigation";
import Routes from "./navigation/Routes";

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
            return { success: true };
        } catch (err) {
            console.error("Update failed", err);
            return { success: false, err };
        }
    }

    return (
        <Router>
            <UserContext.Provider value={{ currentUser, setCurrentUser }}>
                <RecipesContext.Provider value={{ recipes, setRecipes }}>
                    <Navigation logout={logout} />
                    <Routes login={login} register={register} editRecipe={editRecipe} addRecipe={addRecipe} />
                </RecipesContext.Provider>
            </UserContext.Provider>
        </Router>
    );
}

export default App;
