import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartlist,
  getCategories,
  getProducts,
  getWishlist,
} from "../../services";

// --------------- API CALLS ----------------
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

// ---------------- REDUX SLICE -----------------
const dataSlice = createSlice({
  name: "data",
  initialState: {
    products: [],
    cart: [],
    wishlist: [],
    categories: [],
    selectedCategories: [], // category filter
    seasonalFilter: null, // 'alltime' | 'summer' | 'winter'
    price: 1500,
    rating: 0,
    sortBy: null,
    loading: false,
    searched: [],
  },

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    // CATEGORY FILTER (toggle)
    setCategoryFilter: (state, action) => {
      const category = action.payload;
      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter(
          (c) => c !== category
        );
      } else {
        state.selectedCategories.push(category);
      }
    },

    // SEASONAL FILTER (single select)
    setSeasonalFilter: (state, action) => {
      state.seasonalFilter = action.payload; // 'alltime' | 'summer' | 'winter'
    },

    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    setPrice: (state, action) => {
      state.price = Number(action.payload); // Make sure price is a number
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    // SET SELECTED CATEGORIES (for category click)
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },

    // RESET ALL FILTERS
    clearFilters: (state) => {
      state.price = 1500;
      state.rating = 0;
      state.sortBy = null;
      state.selectedCategories = [];
      state.seasonalFilter = null;
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

// ---------- EXPORT ACTIONS ----------
export const {
  setProducts,
  setCategories,
  setCart,
  setWishlist,
  setPrice,
  setRating,
  setSortBy,
  setCategoryFilter,
  setSeasonalFilter,
  setSelectedCategories,
  clearFilters,
} = dataSlice.actions;

// ---------- EXPORT REDUCER ----------
export default dataSlice.reducer;
