import "./App.css";
import {
  HomePage,
  ProductList,
  Cart,
  Wishlist,
  Login,
  Signup,
  Error,
  SingleProductPage,
  Profile,
  Checkout,
  OrderSummary,
} from "./pages";
import { Navigation, Footer, RequiresAuth } from "./components";
import { useTheme } from "./contexts";
import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";

function App() {
  const { theme } = useTheme();
  return (
    <div className={`App ${theme}`}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route
          path="/cart"
          element={
            <RequiresAuth>
              <Cart />
            </RequiresAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RequiresAuth>
              <Wishlist />
            </RequiresAuth>
          }
        />
        <Route
          path="/singleproduct/:productId"
          element={<SingleProductPage />}
        />
        <Route
          path="/profile"
          element={
            <RequiresAuth>
              <Profile />
            </RequiresAuth>
          }
        />
        <Route
          path="/checkout"
          element={
            <RequiresAuth>
              <Checkout />
            </RequiresAuth>
          }
        />
        <Route
          path="/orders"
          element={
            <RequiresAuth>
              <OrderSummary />
            </RequiresAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error />} />
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
