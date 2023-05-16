import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import Product from "../Pages/Product";
import Cart from "../Pages/Cart";

import { PERMISSIONS } from "../Constant"
import ProductManagment from "../Pages/ProductManagment";

import Header from "../Component/Header";
import { AuthContext } from "../Context/AuthProvider";
import { useContext, useEffect, useState } from 'react';
import { GetUserInfoByToken } from "../utils/GetUserInfoByToken";



export const Route = [
    {
        exact: true,
        path: '/login',
        element: <><Header/><Login/></>,
        auth: false,
    },
    {
        exact: true,
        path: '/',
        element: <><Header/><Login/></>,
        auth: false,
    },
    {
        element: <><h1>Not Found</h1></>,
        auth: false,
    },
    {
        path: '/registration',
        element: <><Header/><Registration /></>,
        loader:({ request }) =>
        fetch("/api/registration.json", {
          signal: request.signal,
        }),
        auth: false,
    },
    {
        path: '/product',
        element: <><Header/><Product/></>,
        loader:({ request }) =>
        fetch("/api/product.json", {
          signal: request.signal,
        }),
        auth: true,
        permissions: [PERMISSIONS.ADMIN, PERMISSIONS.USER],
    },
    {
        path: '/productmanagement',
        element: <><Header/><ProductManagment/></>,
        loader:({ request }) =>
        fetch("/api/productmanagement.json", {
          signal: request.signal,
        }),
        auth: true,
        permissions: [PERMISSIONS.ADMIN],
    },
    {
        path: '/cart',
        element: <><Header/><Cart/></>,
        loader:({ request }) =>
        fetch("/api/cart.json", {
          signal: request.signal,
        }),
        auth: true,
        permissions: [PERMISSIONS.ADMIN, PERMISSIONS.USER],
    },
    {
        element: <><h1>Not Found</h1></>,
        auth: true,
    },
]


export const AppRoute = () => {
const {auth, userInfo} = useContext(AuthContext)

const AuthRoute = Route.filter((route) => route.auth && (route.permissions && route.permissions.includes(userInfo?.role)))
const AuthenticationRoute = !auth ? Route.filter((route) => !route.auth) : []
const router = createBrowserRouter([...AuthenticationRoute, ...AuthRoute])
    return (
        <RouterProvider router={router} />
    )
}
