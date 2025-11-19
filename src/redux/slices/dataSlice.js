// src/store/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartlist,
  getCategories,
  getProducts,
  getWishlist as apiGetWishlist,
  addWishlist as apiAddWishlist,
  deleteWishlist as apiDeleteWishlist,
} from "../../services"; // adjust path as needed

// existing loadInitialData (unchanged)...
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

      const wishlistResponse = await apiGetWishlist({ encodedToken: token });
      dispatch(setWishlist(wishlistResponse.data.wishlist));
    }
  }
);

// --------------- Wishlist thunks ----------------
export const fetchWishlist = createAsyncThunk(
  "data/fetchWishlist",
  async (token) => {
    const res = await apiGetWishlist({ encodedToken: token });
    return res.data.wishlist;
  }
);

export const addWishlistItem = createAsyncThunk(
  "data/addWishlistItem",
  async ({ product, token }) => {
    const res = await apiAddWishlist({ product, encodedToken: token });
    return res.data.wishlist;
  }
);

export const removeWishlistItem = createAsyncThunk(
  "data/removeWishlistItem",
  async ({ productId, token }) => {
    const res = await apiDeleteWishlist({ productId, encodedToken: token });
    return res.data.wishlist;
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
    selectedCategories: [],
    seasonalFilter: null,
    price: 1500,
    rating: 0,
    sortBy: null,
    loading: false,
    searched: [],
    loadText: "",
  },

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    setPrice: (state, action) => {
      state.price = Number(action.payload);
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
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
    setSeasonalFilter: (state, action) => {
      state.seasonalFilter = action.payload;
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
    clearFilters: (state) => {
      state.price = 1500;
      state.rating = 0;
      state.sortBy = null;
      state.selectedCategories = [];
      state.seasonalFilter = null;
    },
    // optional: local UI loading helpers
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadText: (state, action) => {
      state.loadText = action.payload;
    },
    setSearchedProducts: (state, action) => {
      const query = action.payload.toLowerCase();
      state.searched = state.products.filter((item) =>
        item.title.toLowerCase().includes(query)
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadInitialData.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadInitialData.fulfilled, (state) => {
        state.loading = false;
      })
      // fetchWishlist
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      // addWishlistItem
      .addCase(addWishlistItem.pending, (state) => {
        state.loadText = "Adding to wishlist...";
        state.loading = true;
      })
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.loadText = "";
        state.loading = false;
      })
      .addCase(addWishlistItem.rejected, (state) => {
        state.loadText = "";
        state.loading = false;
      })
      // removeWishlistItem
      .addCase(removeWishlistItem.pending, (state) => {
        state.loadText = "Removing from wishlist...";
        state.loading = true;
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.loadText = "";
        state.loading = false;
      })
      .addCase(removeWishlistItem.rejected, (state) => {
        state.loadText = "";
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
  setLoading,
  setLoadText,
  setSearchedProducts,
} = dataSlice.actions;

// ---------- EXPORT REDUCER ----------
export default dataSlice.reducer;
