import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";
import authReducer from "./auth-slice";

const store=configureStore({
    reducer:{
        cart:cartReducer,
        auth:authReducer,

    }
});
store.subscribe(()=>{
    try{
    const cart=store.getState().cart;
    const authState=store.getState().auth;
    localStorage.setItem("cart",JSON.stringify(cart));
    
    if (authState.isAuthenticated) {
        localStorage.setItem("jwtToken", authState.jwtToken);
        localStorage.setItem(
          "user",
          authState.user ? JSON.stringify(authState.user) : ""
        );
      } else {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
      }

    }catch(error){
        console.error("Failed to save the state to the localStorage",error);
    }

})




export default store;



