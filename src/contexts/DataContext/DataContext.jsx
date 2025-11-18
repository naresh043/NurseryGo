import { createContext, useContext, useEffect, useReducer } from "react";
import { DataReducer } from "../Reducers";
import {
  getCartlist,
  getCategories,
  getProducts,
  getWishlist,
  addWishlist,
  addCartlist,
} from "../../services";
import { useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const token = localStorage.getItem("login");
  const [loading, setLoading] = useState(false);
  const [loadText, setLoadText] = useState("");
  const [searched, setSearched] = useState([]);

  const [data, dispatch] = useReducer(DataReducer, {
    products: [],
    cart: [],
    wishlist: [],
    categories: [],
    address: [
      {
        _id: "234FSSDF76SDF",
        name: "Deekshith M D",
        building: "#7/21, 2nd Cross Whitefield",
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
        pincode: "574066",
        phone: "9612345653",
      },
      {
        _id: "64JK3J5343J34",
        name: "Prajwal Naliyar",
        building: "#1/6 5th Cross Hampankatta",
        city: "Mangalore",
        state: "Karnataka",
        country: "India",
        pincode: "574142",
        phone: "9645854587",
      },
    ],
    cartPriceDetails: [],
    orders: [],
    price: 200,
    rating: 0,
    sortBy: null,
    allium: false,
    cruciferous: false,
    fruit: false,
    leafy: false,
    marrow: false,
    root: false,
    alltime: false,
    winter: false,
    summer: false,
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      setLoadText("Loading...");
      try {
        const productResponse = await getProducts();
        dispatch({
          type: "LOAD_PRODUCTS",
          payload: productResponse.data.products,
        });
        const categoryResponse = await getCategories();
        dispatch({
          type: "LOAD_CATEGORY",
          payload: categoryResponse.data.categories,
        });
        if (token) {
          const cart = JSON.parse(localStorage.getItem("cart"));
          cart &&
            cart.map(async (item) => {
              await addCartlist({ product: item, encodedToken: token });
            });
          const cartResponse = await getCartlist({ encodedToken: token });
          dispatch({
            type: "LOAD_CART",
            payload: cartResponse.data.cart,
          });

          const wishlist = JSON.parse(localStorage.getItem("wishlist"));
          wishlist &&
            wishlist.map(async (item) => {
              await addWishlist({ product: item, encodedToken: token });
            });
          const wishlistResponse = await getWishlist({ encodedToken: token });
          dispatch({
            type: "LOAD_WISHLIST",
            payload: wishlistResponse.data.wishlist,
          });
          dispatch({
            type: "CART_PRICE",
            payload: JSON.parse(localStorage.getItem("cart-price")),
          });
          dispatch({
            type: "LOAD_ORDERS",
            payload: JSON.parse(localStorage.getItem("orders")),
          });
        }
      } catch (e) {
        console.error("load", e);
      }
    })();
    setLoadText("");
    setLoading(false);
  }, []);

  var filtered = [];

  const priceFiltered =
    data.price === 200
      ? data.products
      : data.products.filter(
          (item) => parseInt(item.price) <= parseInt(data.price)
        );

  const category =
    data.allium ||
    data.cruciferous ||
    data.marrow ||
    data.leafy ||
    data.fruit ||
    data.root;

  //Category filters
  const allium = priceFiltered.filter((item) =>
    item.categoryName === "Allium" && data.allium ? true : false
  );
  const cruciferous = priceFiltered.filter((item) =>
    item.categoryName === "Cruciferous" && data.cruciferous ? true : false
  );
  const marrow = priceFiltered.filter((item) =>
    item.categoryName === "Marrow" && data.marrow ? true : false
  );
  const fruits = priceFiltered.filter((item) =>
    item.categoryName === "Fruit" && data.fruit ? true : false
  );
  const leafy = priceFiltered.filter((item) =>
    item.categoryName === "Leafy" && data.leafy ? true : false
  );
  const root = priceFiltered.filter((item) =>
    item.categoryName === "Root" && data.root ? true : false
  );
  const categoryfiltered = category
    ? [...allium, ...cruciferous, ...marrow, ...fruits, ...leafy, ...root]
    : priceFiltered;

  const season = data.alltime || data.winter || data.summer;

  //Season category filters
  const alltime = categoryfiltered.filter((item) =>
    item.season === "AllTime" && data.alltime ? true : false
  );
  const summer = categoryfiltered.filter((item) =>
    item.season === "Summer" && data.summer ? true : false
  );
  const winter = categoryfiltered.filter((item) =>
    item.season === "Winter" && data.winter ? true : false
  );

  const seasonFiltered = season
    ? [...alltime, ...summer, ...winter]
    : categoryfiltered;

  //Rating filter
  const ratingfiltered =
    data.rating === 0
      ? seasonFiltered
      : seasonFiltered.filter((item) => item.rating > data.rating);

  //Sorting
  function getSorted(product, sortBy) {
    const output =
      sortBy === null
        ? product
        : product.sort((a, b) => {
            if (sortBy === "LOW_TO_HIGH")
              return parseInt(a.price) - parseInt(b.price);
            else if (sortBy === "HIGH_TO_LOW")
              return parseInt(b.price) - parseInt(a.price);
            else return parseFloat(b.rating) - parseFloat(a.rating);
          });
    filtered = output;
    return output;
  }

  let sorted = getSorted(ratingfiltered, data.sortBy);

  const searchProducts = (...args) => {
    var result =
      args[0] === " "
        ? sorted
        : sorted.filter((p) =>
            p.title.toLowerCase().match(args[0].toLowerCase())
          );

    if (result.length > 0) setSearched(result);
    else setSearched([]);
  };

  filtered =
    searched.length === 0 || searched.length === data.products.length
      ? filtered
      : searched;

  return (
    <DataContext.Provider
      value={{
        data,
        dispatch,
        token,
        filtered,
        loading,
        setLoading,
        loadText,
        setLoadText,
        searchProducts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { useData, DataProvider };
