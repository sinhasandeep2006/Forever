import { createContext, useEffect, useState } from "react";
import axios from 'axios';

import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowsearch] = useState(false);
  const [cartItems, setcartItems] = useState({});
  const [products,setproduct]=useState([])
  const [token,setToken]=useState('')
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select  Product Size ");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] = cartData[itemId][size] + 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
      setcartItems(cartData);
    }
    setcartItems(cartData);

    if (token) {
      try {
          await axios.post(backendUrl + '/api/cart/add', {itemId, size},  { headers: { Authorization: `Bearer ${token}` } });
        
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
  }
  
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itmes in cartItems) {
      for (const item in cartItems[itmes]) {
        try {
          if (cartItems[itmes][item] > 0) {
            totalCount += cartItems[itmes][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setcartItems(cartData);
if (token) {
  try{
  await axios.post(backendUrl + '/api/cart/update', {itemId, size,quantity},  { headers: { Authorization: `Bearer ${token}` } });
  }catch(error){
    console.log(error);
        toast.error(error.message);
  }
}

  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) {
        console.warn(`Product not found for _id: ${items}`);
        continue; // Skip this item if product data is missing
      }
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price*cartItems[items][item];
          }
        } catch (error) {
          console.error("Error in getCartAmount:", error);
        }
        
      }
    }
    return totalAmount;
  };
  const getproductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if(response.data.success){
      setproduct(response.data.product)}
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
const getusercart=async(token)=>{
  try{
    const response = await axios.post(backendUrl + '/api/cart/get', {},  { headers: { Authorization: `Bearer ${token}` } });
    if(response.data)
    {
      setcartItems(response.data.cartData)
    }
  }catch(error){
    console.log(error);
      toast.error(error.message);
  }
}

  useEffect(() => {
    getproductData();
    
  }, []);
  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
      getusercart(localStorage.getItem('token'))
    }
  },[])
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowsearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,setToken,setcartItems
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;