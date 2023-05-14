import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthProvider'
import { cartCount } from '../../Slicer/CartSlicer'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import './style.scss'

const Cart = () => {
  const [cartitem, setCartItem] = useState([])
  const dispatch = useDispatch()
  const auth = useContext(AuthContext)
  const getProduct = async () => {
    const url = "http://localhost:9999/api/products"
    const res = await axios.get(url)
    return res?.data;
  }
  const getCart = async () => {
    const url = "http://localhost:9999/api/get-cart"
    const data = await getProduct()
    const res = await axios.get(`${url}/${auth.id}`)
    const CartProduct = data.filter((product) => {
      return res.data.some((cart) => {
        return cart.productId === product._id;
      });
    }
    );
    setCartItem(CartProduct)
    dispatch(cartCount(cartCount.length))
  }

  const deleteCart = async (cartId)=> {
    const url = "http://localhost:9999/api/remove-cart"
        const res = await axios.delete(url, { params: { cartId: cartId } })
        if(res.data.status === 'ok') {
            toast.success('Product Deleted successfully')
            getCart()
        }
  }

  useEffect(() => {
    getCart()
  },[])
  return (
    <div className="listing-section">
      <div className="cart-section">

        <div className="table-heading">
          <h2 className="cart-product">Product</h2>
          <h2 className="cart-price">Price</h2>
          <h2 className="cart-quantity">Quantity</h2>
          <h2 className="cart-total">Total</h2>
        </div>
        {cartitem && cartitem.map(({name, price, qty, _id}) => {
          return (
            <div className="table-content">
              <div className="cart-product">
                <div className="cart-image-box">
                  <div className="cart-images" id="image-10"></div>
                </div>
                <h2 className="cart-item">{name}</h2>
                <p className="cart-description">A bag of lemons</p>
              </div>
              <div className="cart-price">
                <h3 className="price">${price}</h3>
              </div>
              <div className="cart-quantity">
                <input type="text" name="cart-1-quantity" id="cart-1-quantity" value={qty} />
              </div>
              <div className="cart-total">
                <h3 className="price">$4.99</h3>
                <button onClick={() => deleteCart(_id)} type="button" className="remove" name="remove-1" id="remove-1">x</button>
              </div>
            </div>
          );
        })}

        <div className="checkout">
          <button type="button" name="checkout" id="checkout">Total</button>
          <div className="final-cart-total">
            <h3 className="price">$14.97</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
