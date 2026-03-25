import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";

const store=configureStore({
    reducer:{
        cart:cartReducer,
    }
});
store.subscribe(()=>{
    try{
    const cart=store.getState().cart;
    localStorage.setItem("cart",JSON.stringify(cart));
    }catch(error){
        console.error("Failed to save the state to the localStorage",error);
    }

})




export default store;



