import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowsearch] = useState(false);
  const [cartItems, setcartItems] = useState({});
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
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      
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
    navigate
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;