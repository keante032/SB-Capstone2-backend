import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class RecipeApi {
    static token;

    // this method will be used by all the rest to make requests
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `${RecipeApi.token}` };
        // for get requests, put data into params (req.params)
        // for other requests, leave data in data (req.body)
        const params = (method === "get") ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** Get the current user. */
    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        console.log("Inside api.js getCurrentUser, res is: ", res);
        return res.user;
    }

    /** Get token for login from username, password. */
    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    /** Register for site. */
    static async register(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    /** Get details of recipe */
    static async getRecipe(id) {
        let res = await this.request(`recipes/${id}`);
        return res.recipe;
    }

    /** Find recipes matching search criteria */
    static async findRecipes(searchTerm) {
        let res = await this.request(`recipes/search/${searchTerm}`);
        return res.recipes;
    }

    /** Get all own recipes */
    static async getMyRecipes() {
        let res = await this.request(`recipes/my`);
        return res.recipes;
    }

    /** Get all public recipes */
    static async getPublicRecipes() {
        let res = await this.request(`recipes/public`);
        return res.recipes;
    }

    /** Add new recipe */
    static async addRecipe(data) {
        let res = await this.request(`recipes`, data, "post");
        return res.recipe;
    }

    /** Update existing recipe */
    static async updateRecipe(id, data) {
        let res = await this.request(`recipes/${id}`, data, "patch");
        console.log("Inside api.js updateRecipe, res is: ", res);
        return res.recipe;
    }

    /** Delete existing recipe */
    static async deleteRecipe(id) {
        let res = await this.request(`recipes/${id}`, {}, "delete");
        return res.message;
    }
}

export default RecipeApi;