import { createContext } from "react";
import jwt_decode from "jwt-decode";


const AuthContext = createContext()

const AuthProvider =({children}) => {
    const authValue = localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : {};
    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider, AuthContext}
