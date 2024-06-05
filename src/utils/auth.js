import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth";

/**
 * Function to log in a user.
 * @param {string} email
 * @param {string} password
 * 
 * @returns {Promise} Axios response
 * 
*/
export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

/**
 * Function to log out the current user by removing the user from the local storage.
 * 
 * @returns {void}
 * 
*/
export const logout = () => {
    localStorage.removeItem("user");
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
    const response = await axios.post(`${API_URL}/register`, { username, email, password, role });
    return response.data;
}

/**
 * Function returning the current user from the local storage.
 * 
 * @returns {Object} Current user
 */
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

/**
 * Function returning the Authorization header with the JWT token
 * for the Axios HTTP requests.
 * 
 * @returns {Object} Authorization header
 */
export const authHeader = () => {
    const user = getCurrentUser();

    if (user && user.accessToken) {
        return { Authorization: `Bearer ${user.accessToken}` };
    }
    else {
        return {};
    }
};