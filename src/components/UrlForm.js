import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUrl, editUrl } from "../slices/urlSlice"; // Import addUrl and editUrl actions
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation for navigation and passing state
import Navbar from "./Navbar"; // Import the Navbar component
import checkAuth from "./auth/checkAuth";
import "./UrlForm.css"; // Import the CSS file

const UrlForm = () => {
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // Use location to check if we are editing

    const urls = useSelector(state => state.urls.urls); // Get the list of URLs from the state
    const urlToEdit = location.state?.url || null; // Check if there is a URL to edit

    // Set form values if editing
    useEffect(() => {
        if (urlToEdit) {
            setUrl(urlToEdit.url);
            setTitle(urlToEdit.title);
        }
    }, [urlToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (urlToEdit) {
            // Edit URL logic
            const updatedUrl = {
                ...urlToEdit,
                url,
                title,
            };
            dispatch(editUrl(updatedUrl)); // Dispatch editUrl action
        } else {
            // Add new URL logic
            if (urls.length >= 5) {
                alert("You can only add up to 5 URLs.");
                return;
            }

            // Generate a short URL
            const shortUrl = `short.ly/${Math.random().toString(36).substr(2, 5)}`;
            const newUrl = {
                id: Date.now(),
                url,
                title,
                shortUrl,
                addedTime: new Date().toLocaleString()
            };

            // Dispatch the addUrl action to add the new URL to the Redux state
            dispatch(addUrl(newUrl));
        }

        // Reset form fields
        setUrl("");
        setTitle("");

        // Navigate to the URL list page after adding/editing
        navigate("/urllist");
    };

    // Function to go back to the previous page
    const handleGoBack = () => {
        navigate(-1); // This will take the user to the previous page
    };

    return (
        <>
            {/* Render the Navbar at the top */}
            <Navbar />

            {/* Main Form Content */}
            <div className="url-form-container">
                <h2>{urlToEdit ? "Edit URL" : "Add New URL"}</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Enter URL" 
                        value={url} 
                        onChange={(e) => setUrl(e.target.value)} 
                        required 
                    />
                    <input 
                        type="text" 
                        placeholder="Enter Title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="submit-btn">
                        {urlToEdit ? "Update URL" : "Add URL"}
                    </button>
                </form>
                {/* Add Go Back Button */}
                
                <button onClick={handleGoBack} className="go-back-btn">Go Back</button>
            </div>
        </>
    );
};

export default checkAuth(UrlForm);
