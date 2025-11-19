import "./banner.css";
import { Link } from "react-router-dom";
export default function Banner() {
  return (
    <div className="product-banner">
      <img src="https://nurserylive.com/cdn/shop/files/nurserylive-home-page-banner-balcony-and-terrace-garden-metal-stand-v3-diwali_2dcace98-30fb-46b5-a85e-d5f6b1245c6c_1349x500.jpg?v=1698582505" alt="" />
      <Link
        to="/productlist"
        className="btn btn-solid-primary link-btn link-style-none order-now"
      >
        Shop Now <i className="fa-solid fa-angles-right"></i>
      </Link>
    </div>
  );
}
