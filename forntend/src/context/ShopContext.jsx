import { createContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext()

const ShopContextProvider =(props)=>{
    const currency ='₹';
    const delivery_fee=10;

    const[search ,setSearch]=useState('');
    const [showSearch,setShowsearch] =useState(false)
    const value={  
        products
        ,currency,delivery_fee,search,setSearch,showSearch,setShowsearch
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider