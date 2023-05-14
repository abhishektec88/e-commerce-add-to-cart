import React, { useContext } from 'react'
import './style.scss'
import { Link, useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AuthContext } from '../../Context/AuthProvider';
import { PERMISSIONS } from '../../Constant';
// import { Button } from '@mui/material';
import { useSelector } from 'react-redux'

const Header = () => {
  const auth = useContext(AuthContext)
  const Navigate = useNavigate()
  const count = useSelector((state) => state.cartCount.value)

  const checkAuth = Object.keys(auth).length

  const Logout = () => {
    // localStorage.removeItem('token')
    // if(!checkAuth) {
    //   Navigate('/')
    // }
    console.log('wdjsdhjdhkh', checkAuth)
  }
{/* <button  onClick={() => Logout()}>Logout</button> */}

  return (
    <>
    {auth && auth.role === PERMISSIONS.ADMIN ? <></> :
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
        {auth && auth.role === PERMISSIONS.USER && <li><a href="/">Product</a></li>}
        {/* {auth && auth.role === PERMISSIONS.ADMIN && <li><a href="/productmanagement">Product management</a></li>} */}
        {auth && auth.role === PERMISSIONS.USER && <li><a href="/cart">cart</a></li>}
        {!checkAuth && (
          <>
            <li><a href="/registration">register</a></li>

            <li><a href="/login">login</a></li>
          </>
        )}
        {checkAuth && auth.role === PERMISSIONS.USER && <li><ShoppingCartIcon/> <span>{count}</span></li>}

      </ul>

    </div>

  </nav>
    }
    </>
  )
}

export default Header
