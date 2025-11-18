export const DataReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      return { ...state, products: action.payload };
    case "LOAD_WISHLIST":
      localStorage.setItem("wishlist", JSON.stringify(action.payload));
      return { ...state, wishlist: action.payload };
    case "LOAD_CART":
      localStorage.setItem("cart", JSON.stringify(action.payload));
      return { ...state, cart: action.payload };
    case "LOAD_CATEGORY":
      return { ...state, categories: action.payload };
    case "CART_PRICE":
      localStorage.setItem("cart-price", JSON.stringify(action.payload));
      return {
        ...state,
        cartPriceDetails: action.payload,
      };
    case "LOAD_ORDERS":
      localStorage.setItem("orders", JSON.stringify(action.payload));
      return {
        ...state,
        orders: action.payload,
      };
    case "PRICE":
      return { ...state, price: action.payload };
    case "RATING":
      return { ...state, rating: action.payload };
    case "SORT":
      return { ...state, sortBy: action.payload };
    case "ALLIUM":
      return { ...state, allium: !state.allium };
    case "CRUCIFEROUS":
      return { ...state, cruciferous: !state.cruciferous };
    case "ROOT":
      return { ...state, root: !state.root };
    case "FRUIT":
      return { ...state, fruit: !state.fruit };
    case "MARROW":
      return { ...state, marrow: !state.marrow };
    case "LEAFY":
      return { ...state, leafy: !state.leafy };
    case "ALLTIME":
      return { ...state, alltime: !state.alltime };
    case "SUMMER":
      return { ...state, summer: !state.summer };
    case "WINTER":
      return { ...state, winter: !state.winter };
    case "CLEAR":
      return {
        ...state,
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
        summer: false,
        winter: false,
      };
    case "LOGOUT":
      return { ...state, wishlist: [], cart: [] };
    default:
      return state;
  }
};
