import "./singleproduct.css";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../../contexts";
import { useUserActions } from "../../hooks";

export const SingleProduct = ({ product }) => {
  const { data } = useData();
  const { addWish, deleteWish, addCart } = useUserActions();
  const navigate = useNavigate();
  const token = localStorage.getItem("login");

  const description = data.categories.map((i) =>
    i.categoryName === product.categoryName ? i.description : ""
  );

  const wish = data.wishlist.some((item) => item.title === product.title)
    ? "wishlisted"
    : "notwishlisted";

  return (
    <div
      className={`${product.outofstock ? "overlay" : " "} single-card`}
      key={product._id}
    >
      <div className="single-image">
        <img src={product.image} alt="" />
      </div>
      <div className="single-details ">
        {product.outofstock && (
          <h2 className="text-3xl text-center">Out of Stock</h2>
        )}
        <h2 className="card-heading text-3xl">{product.title}</h2>
        <p className="text-xl">{description}</p>
        <div className="rating text-sm">
          <span className="rating-value">
            {product.rating}
            <i className="fa fa-star checked margin-l"></i>
          </span>
          (<span className="rating-number text-md">2333</span>)
        </div>
        <h4 className="product-price text-xl">
          Rs.{product.price}/kg{" "}
          <span className="original-price text-strike-through text-lg">
            Rs.{product.price * 1.2}
          </span>
          <span className="discount-percentage text-xl">
            {product.discount}% off
          </span>
        </h4>
        {product.outofstock ? (
          <button
            className="btn btn-icon-text-primary-disabled out-of-stock-button"
            disabled="disabled"
          >
            <span className="btn-icon">
              <i className="fa fa-shopping-basket margin-r"></i>
            </span>
            Add to Basket
          </button>
        ) : data.cart.some((item) => item.title === product.title) ? (
          <Link to="/cart">
            <button className="single-page-btn hover">
              <span className="btn-icon">
                <i className="fa fa-shopping-basket margin-r"></i>
              </span>
              Go To Basket
            </button>
          </Link>
        ) : (
          <button
            className="single-page-btn hover"
            onClick={() => {
              token ? addCart(product) : navigate("/login");
            }}
          >
            <span className="btn-icon">
              <i className="fa fa-shopping-basket margin-r"></i>
            </span>
            Add to Basket
          </button>
        )}
        <div className="wishlist-btn">
          {product.outofstock ? (
            <button
              className="btn btn-icon-text-primary-disabled out-of-stock-button margin-t"
              disabled="disabled"
            >
              <span className="btn-icon">
                <i className="fa fa-shopping-basket margin-r"></i>
              </span>
              Add to Wishlist
            </button>
          ) : (
            <button
              className="single-page-btn hover margin-t"
              onClick={() => {
                token
                  ? wish === "notwishlisted"
                    ? addWish(product)
                    : deleteWish(product._id)
                  : navigate("/login");
              }}
            >
              <span className="btn-icon">
                <i className="fa fa-heart margin-r"></i>
              </span>
              {wish === "wishlisted"
                ? "Remove from Wishlist"
                : "Add to Wishlist"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
