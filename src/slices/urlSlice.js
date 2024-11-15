import { createSlice } from "@reduxjs/toolkit";

export const urlSlice = createSlice({
    name: 'urls',
    initialState: {
        urls: [],
        searchTerm: "",
    },
    reducers: {
        addUrl: (state, action) => {
            state.urls.push(action.payload);
        },
        deleteUrl: (state, action) => {
            state.urls = state.urls.filter(url => url.id !== action.payload);
        },
        editUrl: (state, action) => {
            const index = state.urls.findIndex(url => url.id === action.payload.id);
            if (index !== -1) {
                state.urls[index] = action.payload;
            }
        },
        setUrls: (state, action) => {
            state.urls = action.payload;
        },
        searchUrl: (state, action) => {
            state.searchTerm = action.payload;
        },
    }
});

export const { addUrl, deleteUrl, editUrl, setUrls, searchUrl } = urlSlice.actions;

export default urlSlice.reducer;
