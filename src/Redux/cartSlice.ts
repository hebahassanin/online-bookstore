import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = "https://upskilling-egypt.com:3007/api/basket/item";

// 🟢 شكل الـ Item
interface CartItem {
  _id: string;
  book: string |{
    _id: string;
    price: number;
  } ;
  quantity: number;
}

// 🟢 شكل الـ Cart
interface Cart {
  _id: string;
  customer: string;
  items: CartItem[];
  total: number;
}

// 🟢 شكل الـ State
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
  { bookId: string; quantity: number }, 
  { rejectValue: string }
>("cart/addItemToCart", async ({ bookId, quantity }, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await axios.post(
      "https://upskilling-egypt.com:3007/api/basket/item",
      { book:bookId, quantity }, // ✅ السيرفر بيقرأهم كده
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    // ✅ الـ response بيكون { data, message, ... }
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
        Authorization: `Bearer ${token}`,
        "Cache-Control":"no-cache",
      },
    });
  
  return res.data.data as Cart;
    
  } catch (err:any) {
    return thunkAPI.rejectWithValue(err?.message?? "Failed to fetch cart")
    
  }
});

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
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
  },
});

export default cartSlice.reducer;