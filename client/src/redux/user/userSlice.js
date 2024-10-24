import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
         signinStart : (state) => {
            state.loading = true;   
         },
         signInSuccess : (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
         },
         signInFailure : (state) => {
            state.error = true;
            state.loading = false;
         }
    }
});

export const { signinStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer