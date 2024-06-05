import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";


/**
 * Register component.
 * 
 * @returns {JSX.Element}
 * 
 */

const Register = () => {
    // Uses email, username, password and role (USER, ADMIN, SUPERADMIN) to register a new user

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await login(email, username, password, role);
            navigate('/jobs');
        } catch (error) {
            console.error('Register failed', error);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <label>Role</label>
                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;