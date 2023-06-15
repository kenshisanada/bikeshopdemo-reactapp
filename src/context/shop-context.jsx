import React, {createContext, useState} from 'react'
import {PRODUCTS} from '../products'

export const ShopContext = createContext(null);




export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const getTotalCartAmount = () => {
      let totalAmount= 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
          totalAmount += cartItems[item] * itemInfo.price
        }
      }
      return totalAmount;
    };
    const addToCart = (itemId) => {
        setCartItems((prev) => {
          const updatedCart = { ...prev };
          updatedCart[itemId] = (prev[itemId] || 0) + 1;
          return updatedCart;
        });
      };
      
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
    };
    const updateCartItemCount = (newAmount, itemId) => {
      setCartItems((prev) => ({...prev, [itemId]: newAmount }));
    }
    const contextValue = {
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateCartItemCount, 
      getTotalCartAmount};


  return (
    <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
  )
}
