import "./profile.css";
import { useAuth, useData } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks";

export default function Profile() {
  const { userData, setToken } = useAuth();
  const navigate = useNavigate();
  const { dispatch } = useData();
  const { successToast } = useToast();

  const logoutHandler = () => {
    localStorage.clear();
    setToken(false);
    successToast("Succesfully Logged Out...");
    navigate("/");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="text-center l-h-0">Profile Details</h2>
        <div className="profile-info">
          <span className="field-heading text-lg text-bold">Full Name </span>
          <span className="field-info text-md text-bold">
            : {`${userData.firstName} ${userData.lastName}`}
          </span>
        </div>
        <div className="profile-info">
          <span className="field-heading text-lg text-bold">Email </span>
          <span className="field-info text-md text-bold">
            : {userData.email}
          </span>
        </div>
        <button
          className="btn btn-solid-primary logout"
          onClick={logoutHandler}
        >
          Logout
          <i className="fa fa-sign-out margin-l"></i>
        </button>
      </div>
    </div>
  );
}
