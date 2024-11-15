import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../slices/authSlice";
import "./Navbar.css"; // Import the CSS file for styling

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Logout function
    const handleLogout = () => {
        dispatch(removeUser()); // Dispatch removeUser action to log out
        navigate("/login"); // Redirect to login page after logging out
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>This is a Url page</h2>
            </div>
            <ul className="navbar-links">
                <li><button type="button" onClick={() => navigate('/urlform')}>Add Item</button></li>
                <li><button type="button" onClick={() => navigate('/urllisting')}>URL Listing</button></li>
                <li><button type="button" onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;
