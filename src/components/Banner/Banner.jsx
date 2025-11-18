import "./banner.css";
import { Link } from "react-router-dom";
export default function Banner() {
  return (
    <div className="product-banner">
      <img src="https://i.postimg.cc/TwrgPbD7/veg-banner.png" alt="" />
      <Link
        to="/productlist"
        className="btn btn-solid-primary link-btn link-style-none order-now"
      >
        Shop Now <i className="fa-solid fa-angles-right"></i>
      </Link>
    </div>
  );
}
