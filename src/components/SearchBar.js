import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchUrl } from "../slices/urlSlice";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        dispatch(searchUrl(e.target.value));
    };

    return (
        <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm} 
            onChange={handleSearch} 
        />
    );
};

export default SearchBar;
