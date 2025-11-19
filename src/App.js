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
import { DataProvider, AuthProvider } from "./contexts";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

function App() {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <AuthProvider>
      <DataProvider>
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
          </Routes>
          <Footer />
        </div>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
