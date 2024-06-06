import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomeDetail from '../views/HomeDetailPage.jsx';
import HomePage from '../views/HomePage.jsx';

const url = 'https://phase2-aio.vercel.app'
const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage url={url} />
    },
    {
        path: "/:id",
        element: <HomeDetail url={url} />
    },
]);

export default router