import React, { useContext } from 'react'
import './style.scss'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthProvider';
import { PERMISSIONS } from '../../Constant';

const Header = () => {
  const {auth, userInfo, logoutAuth } = useContext(AuthContext)
  const Navigate = useNavigate()

  const checkAuth = Object.keys(auth).length

  const Logout = () => {
    logoutAuth()
    setTimeout(() => {
      Navigate('/login')
    }, 500)
    
  }

  return (
    <nav className="navbar">

    <div className="left">

      <h1>Navbar</h1>

    </div>

    <div className="right">

      <input type="checkbox" id="check" />

      <ul className="list">
        {auth && userInfo?.role === PERMISSIONS.USER && <li><Link to="/product">Product</Link></li>}
        {auth && userInfo?.role === PERMISSIONS.ADMIN && <li><Link to="/productmanagement">Product management</Link></li>}
        {auth && userInfo?.role === PERMISSIONS.USER && <li><Link to="/cart">cart</Link></li>}
        {!checkAuth && (
          <>
            <li><Link to="/registration">register</Link></li>

            <li><Link to="/">login</Link></li>
          </>
        )}
       {auth && userInfo?.role && <li style={{cursor: 'pointer'}} onClick={Logout}>Log Out</li>}

      </ul>

    </div>

  </nav>
  )
}

export default Header
