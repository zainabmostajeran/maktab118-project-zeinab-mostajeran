import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { CartReducer } from "./slices/cartSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: CartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
