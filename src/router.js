import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App"; // Assuming this is the main layout/component
import Login from './components/Login'; // Make sure the path and file name are correct
import Signup from "./components/Signup";
import UrlList from "./components/UrlList";
import UrlForm from "./components/UrlForm";
import UrlListing from "./components/UrlListing";
const router = createBrowserRouter([
{
    path:'urllisting',
    element: <UrlListing/>},
    { 
        path: "/", 
        element: <Signup /> // Default route is Signup (for new users)
    },
    { 
        path: "login", 
        element: <Login /> // Route for Login page
    },
    { 
        path: "urllist", 
        element: <UrlList /> // Route for URL listing page (after login)
    },
    { 
        path: "urlform", 
        element: <UrlForm /> // Route for the URL form (add/edit URLs)
    },
]);

export default router;
