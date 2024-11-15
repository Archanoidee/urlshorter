import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation to Signup page
import { loginUser } from "../slices/authSlice"; // Import loginUser from authSlice
import "./Login.css"; // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { signedUpUsers } = useSelector(state => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            // Dispatch loginUser action with email and password
            dispatch(loginUser({ email, password }));

            // Navigate to the URL list page after successful login
            navigate("/urllist");
        } catch (error) {
            alert("Login failed: " + error.message); // Handle failed login attempts
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>

            <p className="signup-redirect">
                Don't have an account? <Link to="/">Go to Signup</Link> {/* Link to Signup page */}
            </p>
        </div>
    );
};

export default Login;
