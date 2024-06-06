import * as React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Toastify from 'toastify-js';
import AddCuisine from "../views/AddCuisine.jsx";
import AddUserPage from "../views/AddUserPage.jsx";
import BaseLayout from "../views/BaseLayout.jsx";
import CategoryPage from '../views/CategoryPage.jsx';
import CuisineDetailPage from '../views/CuisineDetailPage.jsx';
import CuisineEditPage from "../views/CuisineEditPage.jsx";
import CuisineImageUpload from "../views/CuisineImgPage.jsx";
import CuisinePage from '../views/CuisinePage.jsx';
import LoginPage from '../views/LoginPage.jsx';

const url = 'https://phase2-aio.vercel.app'
const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage url={url} />
    },
    {
        element: <BaseLayout />,
        loader: () => {
            if (!localStorage.access_token) {
                Toastify({
                    text: "Please log in first",
                    duration: 2000,
                    newWindow: true,
                    close: true,
                    gravity: "bottom",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "#EF4C54",
                        color: "#17202A",
                        boxShadow: "0 5px 10px black",
                        fontWeight: "bold"
                    }
                }).showToast();
                return redirect('/login')
            }

            return null
        },
        children: [
            {
                path: "/categories",
                element: <CategoryPage url={url} />
            },
            {
                path: "/cuisines",
                element: <CuisinePage url={url} />
            },
            {
                path: "/cuisines/:id",
                element: <CuisineDetailPage url={url} />
            },
            {
                path: "/add-user",
                element: <AddUserPage url={url} />
            },
            {
                path: "/cuisines/edit/:id",
                element: <CuisineEditPage url={url} />
            },
            {
                path: "/cuisines/uploadImage/:id",
                element: <CuisineImageUpload url={url} />
            },
            {
                path: "/create-cuisine",
                element: <AddCuisine url={url} />
            },
        ]
    },

]);

export default router