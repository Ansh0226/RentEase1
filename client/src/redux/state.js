import { createSlice } from "@reduxjs/toolkit"

// this data is the data which is stored so this initial
//state is accessible any where so we don't need to pass any where

const initialState = {
    user: null,
    token: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {  // reducer is used to update the state of 
        // a variable it is like a function it have a specific action 
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setListings: (state, action) => {
            state.listings = action.payload.listings

        },
        setTripList: (state, action) => {
            state.user.tripList = action.payload

        },
        setWishList: (state, action) => {
            state.user.wishList = action.payload
          }
    }
})

export const { setLogin, setLogout, setListings, setTripList,setWishList } = userSlice.actions
export default userSlice.reducer
