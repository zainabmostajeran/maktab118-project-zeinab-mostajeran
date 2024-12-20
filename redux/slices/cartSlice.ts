import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  description: string;
  brand: string;
}

interface CartItem extends Product {
  cartQuantity: number;
}

interface ICartState {
  cart: CartItem[];
}

const initialState: ICartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.cart.find((item) => item._id === product._id);
      if (existingItem) {
        existingItem.cartQuantity += 1;
      } else {
        state.cart.push({ ...product, cartQuantity: 1 });
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find((item) => item._id === id);
      if (item && quantity > 0) {
        item.cartQuantity = quantity;
      } else {
        state.cart = state.cart.filter((item) => item._id !== id);
      }
    },
  },
});

export const CartActions = cartSlice.actions;
export const CartReducer = cartSlice.reducer;
