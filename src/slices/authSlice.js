import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        signedUpUsers: [], // Store signed-up users
        currentUser: null  // Track the currently logged-in user
    },
    reducers: {
        setUser: (state, action) => {
            state.signedUpUsers.push(action.payload); // Add new user to signedUpUsers
        },
        loginUser: (state, action) => {
            const { email, password } = action.payload;
            // Check if the user exists and credentials match
            const foundUser = state.signedUpUsers.find(user => user.email === email && user.password === password);
            if (foundUser) {
                state.currentUser = foundUser; // Log the user in
            } else {
                throw new Error("Invalid");
            }
        },
        removeUser: (state) => {
            state.currentUser = null; // Log the user out
        },
    }
});

export const { setUser, loginUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
