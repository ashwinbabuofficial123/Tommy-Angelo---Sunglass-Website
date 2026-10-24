import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",

  initialState: {
    products: [],
    newArrivals: [],
    bestSeller: [],
    suggestedProducts: [],
  },

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    setNewProducts: (state, action) => {
      state.newArrivals = action.payload;
    },

    setBestseller: (state, action) => {
      state.bestSeller = action.payload;
    },

    setSuggested: (state, action) => {
      state.suggestedProducts = action.payload;
    },
  },
});

export const { setProducts, setNewProducts, setBestseller, setSuggested } =
  productSlice.actions;

export default productSlice.reducer;
