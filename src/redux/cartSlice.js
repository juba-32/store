import { createSlice } from "@reduxjs/toolkit";

const getSavedState = () => {
  try {
    const saved = localStorage.getItem("cartState");
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    
    return {
      ...parsed,
      cart: parsed.cart || [],
      favorites: parsed.favorites || [],
      searchQuery: parsed.searchQuery || "",
      category: parsed.category || "",
    };
  } catch (error) {
    return null;
  }
};

const initialState = getSavedState() || {
  cart: [],
  favorites: [],
  totalPrice: 0,
  qty: 0,
  searchQuery: "",
  category: "",
  darkMode: false,
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
      const proInCart = state.cart.find((pro) => pro._id === newItem._id);

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
      const deletProduct = state.cart.find((pro) => pro._id === action.payload);
      if (deletProduct) {
        state.qty -= deletProduct.qty;
        state.totalPrice -= deletProduct.totalPrice;
      }
      state.cart = state.cart.filter((pro) => pro._id !== action.payload);
      localStorage.setItem("cartState", JSON.stringify(state));
    },

    addToFavorites: (state, action) => {
      const newItem = action.payload;
      if (!state.favorites) state.favorites = [];

      const isExist = state.favorites.find((pro) => pro._id === newItem._id);

      if (isExist) {
        state.favorites = state.favorites.filter((pro) => pro._id !== newItem._id);
      } else {
        state.favorites.push(newItem);
      }
      localStorage.setItem("cartState", JSON.stringify(state));
    },

    removeFromFavorites: (state, action) => {
      const productId = action.payload; 
      if (state.favorites) {
        state.favorites = state.favorites.filter((pro) => pro._id !== productId);
      }
      localStorage.setItem("cartState", JSON.stringify(state));
    },

    increment: (state, action) => {
      const product = state.cart.find((pro) => pro._id === action.payload);
      if (product) {
        product.qty++;
        product.totalPrice += product.price;
        state.qty++;
      }
      localStorage.setItem("cartState", JSON.stringify(state));
    },

    decrement: (state, action) => {
      const product = state.cart.find((pro) => pro._id === action.payload);
      if (product && product.qty > 1) {
        product.qty--;
        product.totalPrice -= product.price;
        state.qty--;
      }
      localStorage.setItem("cartState", JSON.stringify(state));
    },

    resetCart: (state) => {
      state.qty = 0;
      state.totalPrice = 0;
      state.cart = [];
      localStorage.setItem("cartState", JSON.stringify(state));
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    
    setCategory: (state, action) => {
      state.category = action.payload;
    },

    clearCategory: (state) => {
      state.category = "";
    },

    clearSearch: (state) => {
      state.searchQuery = "";
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
  clearCategory,
  clearSearch,
  addToFavorites,
  removeFromFavorites,
} = cartSlice.actions;

export default cartSlice.reducer;