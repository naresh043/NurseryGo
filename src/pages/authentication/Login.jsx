import "./authentication.css";
import { getCredentials, getTestData } from "../../utils";
import axios from "axios";
import { useAuth } from "../../contexts";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../../hooks";
import { useLocation } from "react-router-dom";

export default function Login() {
  const location = useLocation();
  const { setToken, setUserData } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { errorToast, successToast } = useToast();

  const testLogin = async () => {
    try {
      const response = await axios.post("/api/auth/login", getTestData());
      if (response.data.encodedToken) {
        localStorage.setItem(
          "login",
          JSON.stringify(response.data.encodedToken)
        );
        localStorage.setItem("user", JSON.stringify(response.data.foundUser));
        setUserData(response.data.foundUser);
        setToken(true);
        successToast("Welcome to FreshBuy...");
        navigate(location?.state?.from?.pathname || "/");
      }
    } catch (e) {
      setError(true);
      errorToast("Some Error Occured while Logging in...");
      navigate("/login");
    }
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const { email, password } = event.target.elements;
      const response = await axios.post(
        "/api/auth/login",
        getCredentials(email, password)
      );
      if (response.data.encodedToken) {
        localStorage.setItem(
          "login",
          JSON.stringify(response.data.encodedToken)
        );
        setToken(true);
        successToast("Welcome to FreshBuy...");
        navigate(location?.state?.from?.pathname || "/");
      }
    } catch (e) {
      setError(true);
      errorToast("Some Error Occured while Logging in...");
      navigate("/login");
    }
  };
  return (
    <div className="grid-container">
      <div className="form">
        <div className="form-data">
          {error && <h3>Wrong credentials</h3>}
          <h2 className="margin-b">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input input-labeled outlined margin">
              <label className="label">Enter Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="freshbuy@gmail.com"
              />
            </div>
            <div className="input input-labeled outlined margin">
              <label className="label">Enter Password</label>
              <input type="password" name="password" placeholder="******" />
            </div>
            <section className="handle">
              <label className="text-md">
                <input type="checkbox" className="margin-r" name="remember" />
                Remember me
              </label>
              <Link
                to="/forgot"
                className="text-md forgot-pwd text-primary margin-l"
              >
                Forgot password?
              </Link>
            </section>
            <input
              type="submit"
              className="btn btn-solid-primary auth-btn margin margiin-l-3-5"
              value="Login"
            />
          </form>
          <button
            className="btn btn-solid-primary auth-btn margin"
            onClick={() => testLogin()}
          >
            Test User Login
          </button>
          <p className="text-lg">
            <Link to="/signup" className=" link-style-none">
              Create New Account?
              <i className="fa fa-angle-right margin-l"></i>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
