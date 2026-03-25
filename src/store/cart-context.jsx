// import React, { act, useContext, useEffect } from "react";
// import { createContext, useState, useReducer } from "react";

// // STEP 1 for creating a context
// export const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// // const initialContext = {
// //   cart: [],
// //   setCart: () => {},
// //   addToCart: () => {
// //     console.log("Added to the cart");
// //   },
// //   removeFromCart: () => {},
// //   totalQuantity: 0,~
// // };

// const ADD_TO_CART = "ADD_TO_CART";
// const REMOVE_FROM_CART = "REMOVE_FROM_CART";
// const CLEAR_CART = "CLEAR_CART";

// const cartReduce = (state, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       const { product, quantity } = action.payload;
//       const existingItem = state.find(
//         (item) => item.productId === product.productId
//       );
//       if (existingItem) {
//         return state.map((item) =>
//           item.productId === product.productId
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }

//       return [...state, { ...product, quantity }];

//     case REMOVE_FROM_CART:
//       return state.filter(
//         (item) => item.productId !== action.payload.productId
//       );
//     case CLEAR_CART:
//       return [];
//     default:
//       return state;
//   }
// };

// export const CartProvider = ({ children }) => {
//   const initialCartState = (() => {
//     try {
//       const storedCart = localStorage.getItem("cart");
//       return storedCart ? JSON.parse(storedCart) : [];
//     } catch (error) {
//       console.error("Failed to parse cart from localStorage", error);
//       return [];
//     }
//   })();
//   const [cart, dispatch] = useReducer(cartReduce, initialCartState);

//   // const [cart, setCart] = useState(() => {
//   //   try {
//   //     const storedCart = localStorage.getItem("cart");
//   //     return storedCart ? JSON.parse(storedCart) : [];
//   //   } catch (error) {
//   //     console.error("Failed to parse cart from localStorage,error");
//   //     return [];
//   //   }
//   // });

//   useEffect(() => {
//     try {
//       localStorage.setItem("cart", JSON.stringify(cart));
//     } catch (error) {
//       console.error("Failed to save the cart to localStorage", error);
      
//     }
//   }, [cart]);

//   // const addToCart = (product, quantity) => {
//   //   setCart((prevCart) => {
//   //     const existingItem = prevCart.find(
//   //       (item) => item.productId === product.productId
//   //     );

//   //     if (existingItem) {
//   //       // Use map() to create a new array with updated quantity
//   //       return prevCart.map((item) =>
//   //         item.productId === product.productId
//   //           ? { ...item, quantity: item.quantity + quantity }
//   //           : item
//   //       );
//   //     }

//   //     // If the product is not in the cart, add it
//   //     return [...prevCart, { ...product, quantity }];
//   //   });
//   // };

//   // // Function to remove an item from the cart
//   // const removeFromCart = (productId) => {
//   //   setCart((prevCart) =>
//   //     prevCart.filter((item) => item.productId !== productId)
//   //   );
//   // };

//   const addToCart = (product, quantity) => {
//     dispatch({ type: ADD_TO_CART, payload: { product, quantity } });
//   };
//   const removeFromCart = (productId) => {
//     dispatch({ type: REMOVE_FROM_CART, payload: { productId } });
//   };
//   const clearCart = () => {
//     dispatch({ type: CLEAR_CART });
//   };

//   const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
//   const totalPrice= cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, totalQuantity,totalPrice,clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };


