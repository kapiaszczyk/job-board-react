import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

/**
 * Login component.
 * 
 * @returns {JSX.Element}
 * 
 */

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/jobs');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;