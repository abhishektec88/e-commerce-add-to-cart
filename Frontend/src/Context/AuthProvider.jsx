import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { GetUserInfoByToken } from "../utils/GetUserInfoByToken";


const AuthContext = createContext()

const AuthProvider =({children}) => {
    const [auth, setAuth] = useState('');

  useEffect(() => {
    const storedAuth = localStorage.getItem('token');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  useEffect(() => {
    if (auth) {
      localStorage.setItem('token', JSON.stringify(auth));
    } else {
      localStorage.removeItem('token');
    }
  }, [auth]);

  const LoginAuth = (user) => {
    setAuth(user);
  };

  const logoutAuth = () => {
    setAuth('');
  };
  const userInfo = GetUserInfoByToken(auth)
    return (
        <AuthContext.Provider value={{auth, setAuth, LoginAuth, logoutAuth, userInfo}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider, AuthContext}
