import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const location = useLocation();
  const [token, setToken] = useState(false);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("login")) {
        setToken(true);
        setUserData(JSON.parse(localStorage.getItem("user")));
      } else {
        navigate(location.pathname);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
