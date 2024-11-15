import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUrl } from "../slices/urlSlice";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Import the Navbar component
import checkAuth from "./auth/checkAuth";
import "./UrlListing.css"; // Import the CSS file

const UrlListing = () => {
    const dispatch = useDispatch();
    const { urls } = useSelector(state => state.urls); // Get URLs from the Redux state

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2; // Set the number of items per page to 2
    const totalPages = Math.ceil(urls.length / itemsPerPage);

    // Get current URLs to display
    const indexOfLastUrl = currentPage * itemsPerPage;
    const indexOfFirstUrl = indexOfLastUrl - itemsPerPage;
    const currentUrls = urls.slice(indexOfFirstUrl, indexOfLastUrl); // Get URLs for the current page

    const handleDelete = (id) => {
        dispatch(deleteUrl(id)); // Dispatch delete action
    };

    const navigate = useNavigate();

    // Navigate to edit form with the selected URL data
    const handleEdit = (url) => {
        navigate('/urlform', { state: { url } });
    };

    // Change page function
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    function goTourllist() {
        navigate('/urllist');
    }

    return (
        <>
            {/* Render the Navbar at the top */}
            <Navbar />

            {/* Main Content */}
            <div className="url-listing-container">
                <button type="button" onClick={goTourllist}>Url List Page</button>
                <h1>URL Listing</h1>
                <ul>
                    {currentUrls.length > 0 ? (
                        currentUrls.map(url => (
                            <li key={url.id}>
                                <h3>{url.title}</h3>
                                <p>Original URL: {url.url}</p>
                                <p>Short URL: {url.shortUrl}</p>
                                <p>Added Time: {url.addedTime}</p>
                                <button onClick={() => handleDelete(url.id)}>Delete</button>
                                <button onClick={() => handleEdit(url)}>Edit</button>
                            </li>
                        ))
                    ) : (
                        <p>No URLs found.</p>
                    )}
                </ul>
                {/* Pagination Controls */}
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default checkAuth(UrlListing);
