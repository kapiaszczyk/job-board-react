import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/api/v1/auth";

var token_expiration = 0;

/**
 * Function to log in a user.
 * @param {string} email
 * @param {string} password
 * 
 * @returns {Promise} Axios response
 * 
*/
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
            }
        });

        var token = response.data["jwt-token"];

        localStorage.setItem("token", token);

        // Set expiration time when the token will expire
        // Which is 15 minutes from now
        token_expiration = new Date().getTime() + 15 * 60 * 1000;

    } catch (error) {
        console.error("Login error:", error);
    }
};

/**
 * Function to log out the current user by removing the user from the local storage.
 * 
 * @returns {void}
 * 
*/
export const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
}

/**
 * Function to register a new user.
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {string} role
 *
 * @returns {Promise} Axios response
 */
export const register = async (username, email, password, role) => {

    try {
        const response = await axios.post(`${API_URL}/register`, { username, email, password, role });

        return response.data;
    } catch (error) {

        console.error("Register error:", error);
    }

}

/**
 * Function returning the current user from the local storage.
 *
 * @returns {Object} Current user
 */
export const getCurrentUser = () => {

    const token = localStorage.getItem("token");

    if (!token) return null;

    if (isTokenExpired()) {
        logout();
        window.location.reload();
    }


    try {
        const decodedToken = jwtDecode(token);
        return {
            username: decodedToken.sub,
            roles: decodedToken.roles,
        };
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }

}

/**
 * Function returning true if the current user is logged in and has the role "USER".
 *
 * @returns {boolean} True if the current user has the role "USER"
 */
export const isUser = () => {
    const user = getCurrentUser();
    if (user) {
        return user.roles.includes("USER");
    }
}

/**
 * Function returning true if the current user is logged in and has the role "ADMIN".
 *
 * @returns {boolean} True if the current user has the role "ADMIN"
 */
export const isAdmin = () => {
    const user = getCurrentUser();
    if (user) {
        return user.roles.includes("ADMIN");
    }
}

/**
 * Function returning the Authorization header with the JWT token
 * for the Axios HTTP requests.
 *
 * @returns {Object} Authorization header
 */
export const authHeader = () => {
    const user = getCurrentUser();

    const token = localStorage.getItem("token");

    if (isTokenExpired()) {
        logout();
        window.location.reload();
    }

    if (user && user.accessToken) {
        return { Authorization: `Bearer ${token}` };
    }
    else {
        return {};
    }
};

/**
 * Function to check if the token is expired.
 *
 * @returns {boolean} True if the token is expired
 */
export const isTokenExpired = () => {
    return new Date().getTime() > token_expiration;
}