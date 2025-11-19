import "./profile.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice"; // import logout action
import { useToast } from "../../hooks";

export default function Profile() {
  const { userData, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { successToast } = useToast();

  const logoutHandler = () => {
    localStorage.removeItem("token"); // remove token from localStorage
    dispatch(logout()); // dispatch the logout action from authSlice
    successToast("Successfully Logged Out...");
    navigate("/"); // redirect to homepage
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
          <span className="field-info text-md text-bold">: {userData.email}</span>
        </div>
        <button className="btn btn-solid-primary logout" onClick={logoutHandler}>
          Logout
          <i className="fa fa-sign-out margin-l"></i>
        </button>
      </div>
    </div>
  );
}
