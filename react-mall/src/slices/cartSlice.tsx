import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartItems, postChangeCart } from "../api/cartApi";

export const getCartItemsAsync = createAsyncThunk("getCartItemsAsync", () => getCartItems());

export const postChangeCartAsync = createAsyncThunk("postChangeCartAsync", (param: CartItemRequest) =>
    postChangeCart(param)
);

const initState: CartItemsArray = { items: [], status: "" };

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initState,
    reducers: {
        clearCart: () => ({ ...initState }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartItemsAsync.pending, (state) => { state.status = "pending"; })
            .addCase(getCartItemsAsync.fulfilled, (_state, action) => ({ items: action.payload, status: "fulfilled" }))
            .addCase(getCartItemsAsync.rejected, (state) => { state.status = "rejected"; })
            .addCase(postChangeCartAsync.pending, (state) => { state.status = "pending"; })
            .addCase(postChangeCartAsync.fulfilled, (_state, action) => ({ items: action.payload, status: "fulfilled" }))
            .addCase(postChangeCartAsync.rejected, (state) => { state.status = "rejected"; });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;