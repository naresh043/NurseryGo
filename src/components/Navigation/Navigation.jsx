import "./navigation.css";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, useData, useTheme } from "../../contexts";
import { Filter } from "..";
import { useState } from "react";
import { Toast } from "../Toast/Toast";

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const { data, dispatch, searchProducts } = useData();
  const { token, setToken } = useAuth();
  const [showData, setShowData] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const logoutHandler = () => {
    localStorage.clear();
    setToken(false);
    navigate("/");
    dispatch({ type: "LOGOUT" });
  };

  const debounce = (cb) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => cb.call(this, ...args), 300);
    };
  };

  const process = debounce((query) => searchProducts(query));

  return (
    <>
      <nav className="navigation-bar">
        <section className="brand logo">
          <Link to="/">
            <img
              src="https://i.postimg.cc/66zZLP4N/freshbuy-new.png"
              alt="logo"
            />
          </Link>
          <span className="brand-text">FreshBuy</span>
          <button
            className="btn btn-outline-primary primary-text"
            onClick={() => navigate("/productlist")}
          >
            Products
          </button>
        </section>
        <div className="responsive-navbar">
          <div
            className="avatar avatar-xs margin-b profile"
            onClick={() => {
              setShowData(!showData);
              setShowFilter(false);
            }}
          >
            <img
              className="img-responsive img-round"
              src="https://i.postimg.cc/28Zcgq1j/avatar.png"
              alt="Avatar"
            />
          </div>
          {showData && (
            <div className="account">
              <button className="badge-container badge-btn margin-b">
                <Link to="/wishlist">
                  <i className="fas fa-heart icon"></i>
                  <span className="status-badge-icon bg-red">
                    {data.wishlist.length}
                  </span>
                </Link>
              </button>
              <button className="badge-container badge-btn margin-b">
                <Link to="/cart">
                  <i className="fas fa-basket-shopping"></i>
                  <span className="status-badge-icon bg-red">
                    {data.cart.length}
                  </span>
                </Link>
              </button>
              {token && (
                <li className="list-inline-item">
                  <button
                    className="btn btn-icon-primary user-signout"
                    onClick={logoutHandler}
                  >
                    <i className="fa fa-sign-out fa-2x"></i>
                  </button>
                </li>
              )}
            </div>
          )}
          <li className="list-inline-item responsive-mode">
            <span className="nav-icon-link link-style-none">
              <i
                className={
                  theme === "light-theme"
                    ? "fas fa-moon nav-icon"
                    : "fas fa-sun nav-icon"
                }
                onClick={() => toggle()}
              ></i>
            </span>
          </li>
          <label className="burger-menu">
            <i
              className="fa-solid fa-bars"
              onClick={() => {
                setShowFilter(!showFilter);
                setShowData(false);
              }}
            ></i>
          </label>
          {showFilter && (
            <div className="filter-bar">
              <Filter />
            </div>
          )}
        </div>
        {location.pathname === "/productlist" && (
          <div className="search-item">
            <div className="input search-field outlined ">
              <button className="search-icon">
                <i className="fa fa-search"></i>
              </button>
              <input
                type="text"
                onChange={(e) => process(e.target.value)}
                name="username"
                placeholder="Search here..."
              />
            </div>
          </div>
        )}
        <ul className="list-style-none account-data">
          {!token && (
            <li className="list-inline-item">
              <Link to="/login" className="btn btn-solid-primary link-btn">
                Login
              </Link>
            </li>
          )}
          {token && (
            <Link to="/profile">
              <li className="list-inline-item">
                <div className="avatar avatar-xs">
                  <img
                    className="img-responsive img-round"
                    src="https://i.postimg.cc/28Zcgq1j/avatar.png"
                    alt="Avatar"
                  />
                </div>
              </li>
            </Link>
          )}
          <li className="list-inline-item">
            <button className="badge-container badge-btn">
              <Link to="/wishlist">
                <i className="fas fa-heart icon"></i>
                <span className="status-badge-icon bg-red">
                  {data.wishlist.length}
                </span>
              </Link>
            </button>
          </li>
          <li className="list-inline-item">
            <button className="badge-container badge-btn">
              <Link to="/cart">
                <i className="fas fa-basket-shopping"></i>
                <span className="status-badge-icon bg-red">
                  {data.cart.length}
                </span>
              </Link>
            </button>
          </li>
          <li className="list-inline-item">
            <span className="nav-icon-link link-style-none">
              <i
                className={
                  theme === "light-theme"
                    ? "fas fa-moon nav-icon"
                    : "fas fa-sun nav-icon"
                }
                onClick={() => toggle()}
              ></i>
            </span>
          </li>
        </ul>
      </nav>
      <Toast />
    </>
  );
}
