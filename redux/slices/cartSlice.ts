import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { logout } from "./authSlice";

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
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}


export const fetchCart = createAsyncThunk<
  CartItem[],
  void,
  { state: RootState }
>("cart/fetchCart", async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const userId = state.auth.user?._id;

  if (!userId) {
    return rejectWithValue("No user ID found; user not logged in.");
  }

  const response = await fetch(`/api/cart?userId=${userId}`, { method: "GET" });
  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  const data = await response.json();
  return data as CartItem[];
});


export const addProductToCart = createAsyncThunk<
  Product,
  Product,
  { state: RootState }
>("cart/addProductToCart", async (product, { getState, rejectWithValue }) => {
  const state = getState();
  const userId = state.auth.user?._id;

  if (!userId) {
    return rejectWithValue("No user ID found; user not logged in.");
  }

  const response = await fetch(`/api/cart?userId=${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to add product");
  }
  return product;
});


export const updateItemQuantity = createAsyncThunk<
  { productId: string; newQuantity: number },
  { productId: string; newQuantity: number },
  { state: RootState }
>(
  "cart/updateItemQuantity",
  async ({ productId, newQuantity }, { getState, rejectWithValue }) => {
    const state = getState();
    const userId = state.auth.user?._id;

    if (!userId) {
      return rejectWithValue("No user ID found; user not logged in.");
    }

    const response = await fetch(`/api/cart/${productId}?userId=${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartQuantity: newQuantity }),
    });

    if (!response.ok) {
      throw new Error("Failed to update item quantity");
    }

    return { productId, newQuantity };
  }
);

export const removeItemFromCart = createAsyncThunk<
  string,
  string,
  { state: RootState }
>(
  "cart/removeItemFromCart",
  async (productId, { getState, rejectWithValue }) => {
    const state = getState();
    const userId = state.auth.user?._id;

    if (!userId) {
      return rejectWithValue("No user ID found; user not logged in.");
    }

    const response = await fetch(`/api/cart/${productId}?userId=${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to remove item");
    }

    return productId;
  }
);


export const clearCart = createAsyncThunk<boolean, void, { state: RootState }>(
  "cart/clearCart",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const userId = state.auth.user?._id;

    if (!userId) {
      return rejectWithValue("No user ID found; user not logged in.");
    }

    const response = await fetch(`/api/cart?userId=${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to clear cart");
    }

    return true;
  }
);

const initialState: ICartState = {
  cart: [],
  status: "idle",
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchCart
    builder.addCase(fetchCart.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.cart = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to fetch cart";
    });

    // addProductToCart
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      const product = action.payload;
      const existingItem = state.cart.find((i) => i._id === product._id);
      if (existingItem) {
        existingItem.cartQuantity += 1;
      } else {
        state.cart.push({ ...product, cartQuantity: 1 });
      }
    });

    // updateItemQuantity
    builder.addCase(updateItemQuantity.fulfilled, (state, action) => {
      const { productId, newQuantity } = action.payload;
      const item = state.cart.find((i) => i._id === productId);
      if (item) {
        if (newQuantity <= 0) {
          // remove from cart if quantity <= 0
          state.cart = state.cart.filter((i) => i._id !== productId);
        } else {
          item.cartQuantity = newQuantity;
        }
      }
    });

    builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter((i) => i._id !== productId);
    });

    builder.addCase(clearCart.fulfilled, (state) => {
      state.cart = [];
    });

    builder.addCase(logout, () => initialState);
  },
});

export const CartReducer = cartSlice.reducer;
