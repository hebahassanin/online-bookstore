import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

export interface User{
    id: string;
    first_name: string;
    last_name:string;
    email:string;
    status?:string;
    role?: string;
}

export interface AuthState{
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState:AuthState={
  
  /* chech if there is user save in localStorage,if true return user after convert to object 
  but if false it will null.
  - chech also token*/
    user: localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")!) : null,
    token: localStorage.getItem("accessToken") || null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

        // to update user data or token after login
        setCredentials: (
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;

            // I save acesstoken and userData in localStorage to avoid lose data when refresh.
            localStorage.setItem("accessToken", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },

         // logout
    logout: (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      },

      setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
  
      setError: (state, action: PayloadAction<string | null>) => {
        state.error = action.payload;
      },
 }
})

// actions
export const { setCredentials, logout, setLoading, setError } =
  authSlice.actions;


export default authSlice.reducer;  