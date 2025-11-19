import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadInitialData } from "../redux/slices/dataSlice";

// Create contexts
const DataContext = createContext();
const AuthContext = createContext();

// Custom hooks
export const useData = () => useContext(DataContext);
export const useAuth = () => useContext(AuthContext);

// Data Provider
export const DataProvider = ({ children }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  useEffect(() => {
    const token = localStorage.getItem("login");
    dispatch(loadInitialData(token));
  }, [dispatch]);

  const filtered = data.products
    .filter((product) => {
      let matches = true;

      // Category filter
      if (data.selectedCategories.length > 0) {
        matches =
          matches &&
          data.selectedCategories.includes(product.categoryName.toLowerCase());
      }

      // Price filter
      if (data.price < product.price) {
        matches = false;
      }

      // Rating filter
      if (data.rating > product.rating) {
        matches = false;
      }

      // Seasonal filter
      if (data.seasonalFilter) {
        const seasonMap = {
          alltime: "AllTime",
          summer: "Summer",
          winter: "Winter",
        };
        matches = matches && product.season === seasonMap[data.seasonalFilter];
      }

      return matches;
    })
    .sort((a, b) => {
      if (data.sortBy === "LOW_TO_HIGH") {
        return a.price - b.price;
      } else if (data.sortBy === "HIGH_TO_LOW") {
        return b.price - a.price;
      } else if (data.sortBy === "POPULARITY") {
        return b.rating - a.rating;
      }
      return 0;
    });

  const value = {
    data,
    filtered,
    dispatch,
    loading: data.loading,
    loadText: data.loadText,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Auth Provider
export const AuthProvider = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const value = {
    ...auth,
    dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
