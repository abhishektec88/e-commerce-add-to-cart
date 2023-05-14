import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../Context/AuthProvider'
import { cartCount } from '../../Slicer/CartSlicer'
import { useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios'
import './style.scss'

const Product = () => {
  const [productData, setProductData] = useState([])
  const [productQnty, setProductQnty] = useState(1)
  const [productSort, setProductSort] = useState('')
  const [cartitem, setCartItem] = useState([])

  const dispatch = useDispatch()

  const auth = useContext(AuthContext)

  function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

  const getProduct = async () => {
    const url = "http://localhost:9999/api/products"
    const res = await axios.get(url)
    setProductData(res.data)
  }

  const getCart = async () => {
    const url = "http://localhost:9999/api/get-cart"
    const res = await axios.get(`${url}/${auth._id}`)
    const CartProduct = productData.filter((product) => {
      return res.data.some((cart) => {
        return cart.productId === product._id;
      });
    }
    );
    setCartItem(CartProduct)
    dispatch(cartCount(cartCount.length))
  }

  useEffect(() => {
    getProduct();
    getCart()
  }, [])

  const filterByCatogories =(e, value)=> {
    const data = productData.filter((data) => data.categories === value)
    setProductData(data)
  }


  const ProductSorting = (e, field) => {
    setProductSort(field)
  }



  const addToCart = async (param) => {
    const url = "http://localhost:9999/api/add-to-cart"
    const res = await axios.post(url, param)
    getProduct();
    getCart()
  }
  return (
    <>
      <div className='search_panel'>
        <Autocomplete
        className='search_slection'
          disablePortal
          id="combo-box-demo"
          onInputChange={filterByCatogories}
          options={[{ label: 'grocery', value: 'grocery' },
          { label: 'food', value: 'food' }]}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Serch or filter" />}
        />
        <Autocomplete
          disablePortal
          className='search_slection'
          id="combo-box-demo"
          onInputChange={ProductSorting}
          options={[{ label: 'price', value: 'price' },
          { label: 'name', value: 'name' }]}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="sort" />}
        />
      </div>
      <div className="listing-section">
        {productData && productData.sort(dynamicSort(productSort)).map(({ image, name, price, description, _id }) => {
          return (
            <div className="product">
              <div className="image-box">
                <img style={{ height: '200px' }} alt='sjsjj' src={image} />
              </div>
              <div className="text-box">
                <h2 className="item">{name}</h2>
                <h3 className="price">Rs. {price}</h3>
                <p className="description">{description}</p>
                <label >Quantity:</label>
                <input onChange={(e) => setProductQnty(e.target.value)} type="text" name="item-1-quantity" id="item-1-quantity" value={productQnty} />
                <button onClick={() => addToCart({ qty: productQnty, productId: _id, userId: auth.id })} type="button" name="item-1-button" id="item-1-button">Add to Cart</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default Product
