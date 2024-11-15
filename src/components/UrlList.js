import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar"; // Import the Navbar component
import { Link } from "react-router-dom";
import checkAuth from "./auth/checkAuth";
import "./UrlList.css"; // Import the CSS file

const UrlList = () => {
    const { urls, searchTerm } = useSelector(state => state.urls);
    const filteredUrls = urls.filter(url => url.title.includes(searchTerm) || url.url.includes(searchTerm));

    return (
        <>
            {/* Render the Navbar at the top */}
            <Navbar />

            {/* Main Content */}
            <div className="url-list-container">
                <h2>URL List</h2>
                <SearchBar />
                <ul>
                    {filteredUrls.map(url => (
                        <li key={url.id}>
                            <h3>{url.title}</h3>
                            <Link to={url.url}>Original URL: {url.url}</Link><br />
                            <Link to={url.url}>Short URL: {url.shortUrl}</Link>
                            <p>Added Time: {url.addedTime}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default checkAuth(UrlList);
