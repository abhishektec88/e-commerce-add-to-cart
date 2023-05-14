import {
    createBrowserRouter,
    RouterProvider,
    // Route,
  } from "react-router-dom";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import Product from "../Pages/Product";
import Cart from "../Pages/Cart";

import { PERMISSIONS } from "../Constant"
import ProductManagment from "../Pages/ProductManagment";

import jwt_decode from "jwt-decode";

const authValue = localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : {};
import Header from "../Component/Header";

const auth = Object.keys(authValue).length ? true : false

export const Route = [
    {
        path: '/login',
        element: <><Header/><Login/></>,
        auth: false,
    },
    {
        path: '/registration',
        element: <><Header/><Registration /></>,
        auth: false,
    },
    {
        path: '/',
        element: <><Header/><Product/></>,
        auth: false,
        permissions: [PERMISSIONS.PUBLIC],
    },
    {
        path: '/productmanagement',
        element: <><Header/><ProductManagment/></>,
        auth: true,
        permissions: [PERMISSIONS.ADMIN],
    },
    {
        path: '/cart',
        element: <><Header/><Cart/></>,
        auth: true,
        permissions: [PERMISSIONS.ADMIN, PERMISSIONS.USER],
    },
]



// console.log('authValue', localStorage.getItem('data') && jwt_decode(localStorage.getItem('data')))



const userType = 'ADMIN'

const AuthRoute = Route.filter((route) => route.auth === auth && (route.permissions && route.permissions.includes(userType)))
const PublicRoute = Route.filter((route) => auth && route.permissions && route.permissions.includes(PERMISSIONS.PUBLIC))
const AuthenticationRoute = !auth ? Route.filter((route) => !route.auth) : []



const router = createBrowserRouter([...AuthRoute, ...PublicRoute, ...AuthenticationRoute])


export const AppRoute = () => {
    console.log('router', router)
    return (
        <RouterProvider router={router} ddData={'datatata'} />
    )
}