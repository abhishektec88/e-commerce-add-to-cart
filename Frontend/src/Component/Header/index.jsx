import React, { useContext } from 'react'
import './style.scss'
import { Link, useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AuthContext } from '../../Context/AuthProvider';
import { PERMISSIONS } from '../../Constant';
// import { Button } from '@mui/material';
import { useSelector } from 'react-redux'
import { Button } from '@mui/material';

const Header = () => {
  const auth = useContext(AuthContext)
  const Navigate = useNavigate()
  const count = useSelector((state) => state.cartCount.value)

  const checkAuth = Object.keys(auth).length

  const Logout = () => {
    localStorage.removeItem('token')
    Navigate('/login')
  }
{/* <button  onClick={() => Logout()}>Logout</button> */}

  return (
    <nav class="navbar">

    <div class="left">

      <h1>Navbar</h1>

    </div>

    <div class="right">

      <input type="checkbox" id="check" />

      <label for="check" class="checkBtn">

        <i class="fa fa-bars"></i>

      </label>

      <ul class="list">
        {auth && auth.role === PERMISSIONS.USER && <li><Link to="/">Product</Link></li>}
        {auth && auth.role === PERMISSIONS.ADMIN && <li><Link to="/productmanagement">Product management</Link></li>}
        {auth && auth.role === PERMISSIONS.USER && <li><Link to="/cart">cart</Link></li>}
        {!checkAuth && (
          <>
            <li><Link to="/registration">register</Link></li>

            <li><Link to="/login">login</Link></li>
          </>
        )}
       {auth && auth.role && <li style={{cursor: 'pointer'}} onClick={() => Logout()}>Log Out</li>}

      </ul>

    </div>

  </nav>
  )
}

export default Header
