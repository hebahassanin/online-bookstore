import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = "https://upskilling-egypt.com:3007/api/basket/item";

// every Item in cart
interface CartItem {
  _id: string;
  book: null |{
    _id: string;
    price: number;
  } ;
  quantity: number;
}

// Cart
interface Cart {
  _id: string;
  customer: string;
  items: CartItem[];
  total: number;
}

// State
interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

export const addItemToCart = createAsyncThunk<
  Cart, // بيرجع cart كامل
  { bookId: string; quantity: number}, 
  { rejectValue: string }>
  ("cart/addItemToCart", async ({ bookId, quantity}, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await axios.post(
      "https://upskilling-egypt.com:3007/api/basket/item",
      { book:bookId, quantity }, //  السيرفر بيقرأهم كده
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    //  الـ response بيكون { data, message, ... }
    return res.data.data as Cart; 
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err?.message ?? "Failed to add item");
  }
});

// Get all cart items
export const fetchCartItems = createAsyncThunk <Cart, void, { rejectValue: string }>
("cart/fetchCartItems", async (_,thunkAPI)=>{
  try {
    const token = localStorage.getItem("accessToken");
    console.log("Token before fetch", token)
    const res = await axios.get("https://upskilling-egypt.com:3007/api/basket",
    {
      headers:{
        Authorization: `Bearer ${token}`
      },
    });
  
  return res.data as Cart;
    
  } catch (err:any) {
    return thunkAPI.rejectWithValue(err?.message?? "Failed to fetch cart")
    
  }
});

// Update Cart
export const updateCart = createAsyncThunk<Cart,
{cartId:string; bookId: string; quantity: number,items: CartItem[]},{rejectValue:string}>
("cart/updateCart", async ({cartId, bookId, quantity,items},thunkAPI) =>{
  try {
    const token = localStorage.getItem("accessToken");
    const res= await axios.put(`https://upskilling-egypt.com:3007/api/basket/${cartId}`,
    {
      items:[
        {
          book: bookId,
          quantity: quantity.toString()
        },
        ...items,
      ]
    },
    {
      headers:{
        Authorization: `Bearer ${token}`,
      }
    }
    );
    console.log(res.data?.data);
    
    return res.data?.data as Cart;
    
  } catch (err:any) {
    return thunkAPI.rejectWithValue(err?.message?? "Failed to update cart")
  }
})


export const deleteCartItem = createAsyncThunk<
  Cart,
  string,
  { rejectValue: string }
  >("cart/deleteCartItem", async (itemId, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await axios.delete(
      `https://upskilling-egypt.com:3007/api/basket/item/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
  );

  return res.data?.data ?? res.data;
} catch (err: any) {
  return thunkAPI.rejectWithValue(err?.message ?? "Failed to delete item");
}
});
// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    clearCart:(state)=>{
      state.cart = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error occurred";
      })

      // fetchCartItems
      .addCase(fetchCartItems.pending,(state)=>{
        state.loading= true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled,(state,action: PayloadAction<Cart>)=>{
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error occurred";
      })

      // update Cart
      .addCase(updateCart.pending,(state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled,(state,action: PayloadAction<Cart>)=>{
        state.loading = false;
        state.cart = action.payload;
      })

     

      .addCase(updateCart.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload ?? "Error occurred";
      })
      
      // Delete Cart item
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error occurred";
      })
  },
});

export const {clearCart} = cartSlice.actions;

export default cartSlice.reducer;