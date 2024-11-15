import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../slices/authSlice";
import "./Signup.css"; // Import the CSS file

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signedUpUsers = useSelector(state => state.auth.signedUpUsers); // Get signed-up users from Redux state

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the email already exists
        const emailExists = signedUpUsers.some(user => user.email === email);

        if (emailExists) {
            setErrorMessage("Email already exists!"); // Set error message if email exists
            return; // Stop form submission
        }

        // Create a new user object
        const newUser = { username, email, password };

        // Dispatch the setUser action to add the new user
        dispatch(setUser(newUser));

        // Reset form fields
        setUsername("");
        setEmail("");
        setPassword("");
        setErrorMessage(""); // Clear the error message on successful signup

        // Navigate to login page after signup
        navigate("/login");
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
                <button type="submit">Sign Up</button>
            </form>

            <p className="login-redirect">
                Already have an account? <Link to="/login">Go to Login</Link>
            </p>
        </div>
    );
};

export default Signup;
