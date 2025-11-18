import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartlist,
  getCategories,
  getProducts,
  getWishlist,
  addWishlist,
  addCartlist,
} from "../../services";

// --------------- API CALLS (ASYNC LOGIC) ----------------
export const loadInitialData = createAsyncThunk(
  "data/loadInitialData",
  async (token, { dispatch }) => {
    const products = await getProducts();
    const categories = await getCategories();

    dispatch(setProducts(products.data.products));
    dispatch(setCategories(categories.data.categories));

    if (token) {
      const cartResponse = await getCartlist({ encodedToken: token });
      dispatch(setCart(cartResponse.data.cart));

      const wishlistResponse = await getWishlist({ encodedToken: token });
      dispatch(setWishlist(wishlistResponse.data.wishlist));
    }
  }
);

// ---------------- SLICE -----------------
const dataSlice = createSlice({
  name: "data",
  initialState: {
    products: [],
    cart: [],
    wishlist: [],
    categories: [],
    price: 200,
    rating: 0,
    sortBy: null,
    loading: false,
    searched: [],
  },
  reducers: {
    setProducts: (state, action) => { state.products = action.payload },
    setCategories: (state, action) => { state.categories = action.payload },
    setCart: (state, action) => { state.cart = action.payload },
    setWishlist: (state, action) => { state.wishlist = action.payload },
    setPrice: (state, action) => { state.price = action.payload },
    setRating: (state, action) => { state.rating = action.payload },
    setSortBy: (state, action) => { state.sortBy = action.payload },
    clearFilters: (state) => {
      state.price = 200;
      state.rating = 0;
      state.sortBy = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadInitialData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadInitialData.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export const {
  setProducts, setCategories, setCart, setWishlist,
  setPrice, setRating, setSortBy, clearFilters
} = dataSlice.actions;

export default dataSlice.reducer;
