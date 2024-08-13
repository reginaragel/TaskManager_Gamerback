import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    token:null,
    isAuthenticated:false,
    userName:null,
};

const UserSlice=createSlice({
    name:'users',
    initialState,
    reducers:{
        loginUser(state,action){
            state.user=action.payload.user;
            state.token=action.payload.token;
            state.isAuthenticated=true;
            state.userName=action.payload.userName;
        },
        signupUser(state,action){
            state.user=action.payload.user;
            state.token=action.payload.token;
            state.isAuthenticated=true
            
        },
    }
})
export const {loginUser,signupUser}=UserSlice.actions;
export default UserSlice.reducer;