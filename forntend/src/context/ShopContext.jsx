import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext()

const ShopContextProvider =(props)=>{
    const currency ='₹';
    const delivery_fee=10;

    const[search ,setSearch]=useState('');
    const [showSearch,setShowsearch] =useState(false)
    const [ cartItems, setcartItems]=useState({})
    const addToCart= async (itemId,size)=>{
        let cartData=  structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1
            }
            else{
                cartData[itemId][size]=1
            }
        }
        else{
            cartData[itemId]={};
            cartData[itemId][size]=1
            setcartItems(cartData)
        }
    }
    const value={  
        products
        ,currency,delivery_fee,search,setSearch,showSearch,setShowsearch,cartItems,addToCart
    }
    useEffect(()=>{
        
    },[cartItems])
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider