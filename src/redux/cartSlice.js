import { createSlice } from "@reduxjs/toolkit";
const initialState = JSON.parse(localStorage.getItem("cartState")) || {
  cart: [],
  totalPrice: 0,
  qty: 0,
  searchQuery: "",
  darkMode: JSON.parse(localStorage.getItem("cartState"))?.darkMode ?? false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("cartState", JSON.stringify(state));
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const proInCart = state.cart.find((pro) => pro.id === newItem.id);

      if (proInCart) {
        proInCart.qty += 1;
        proInCart.totalPrice += newItem.price;
      } else {
        state.cart.push({
          ...newItem,
          qty: 1,
          totalPrice: newItem.price,
        });
      }
      state.qty += 1;
      state.totalPrice += newItem.price;
      localStorage.setItem("cartState", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const deletProduct = state.cart.find((pro) => pro.id === action.payload);
      if (deletProduct) {
        state.qty -= deletProduct.qty;
        state.totalPrice -= deletProduct.totalPrice;
      }
      state.cart = state.cart.filter((pro) => pro.id !== action.payload);
      localStorage.setItem("cartState", JSON.stringify(state));
    },

    increment: (state, action) => {
      const product = state.cart.find((pro) => pro.id === action.payload);
      product.qty++;
      product.totalPrice += product.price;
      state.qty++;
      localStorage.setItem("cartState", JSON.stringify(state));
    },

    decrement: (state, action) => {
      const product = state.cart.find((pro) => pro.id === action.payload);
      product.qty--;
      product.totalPrice -= product.price;
      state.qty--;
      localStorage.setItem("cartState", JSON.stringify(state));
    },

    resetCart: (state, action) => {
      state.qty = 0;
      state.cart = [];
      localStorage.setItem("cartState", JSON.stringify(state));
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addToCart,
  increment,
  decrement,
  removeFromCart,
  resetCart,
  setCategory,
  setMode,
  setSearchQuery,
} = cartSlice.actions;
export default cartSlice.reducer;
