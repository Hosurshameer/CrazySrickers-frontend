import { createSlice } from "@reduxjs/toolkit";



const initialAuthState = (() => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const user = localStorage.getItem("user");
      if (jwtToken && user) {
        return {
          jwtToken,
          user: JSON.parse(user),
          isAuthenticated: true,
        };
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
    }
    return {
      jwtToken: null,
      user: null,
      isAuthenticated: false,
    };
  })();
const authSlice=createSlice({
    name:"auth",
    initialState:initialAuthState,
    reducers:{
        loginSuccess(state,action){
            const {jwtToken,user}=action.payload;
            state.jwtToken=jwtToken;
            state.user=user;
            state.isAuthenticated=true;
        },
        logout(state){
           state.jwtToken=null;
           state.user=null;
           state.isAuthenticated=false;
        },
    },
});

export const {loginSuccess,logout} = authSlice.actions;

export default authSlice.reducer;

export const selectJwtToken=(state)=>state.auth.jwtToken;
export const selectUser=(state)=>state.auth.user;
export const selectIsAuthenticated=(state)=>state.auth.isAuthenticated;