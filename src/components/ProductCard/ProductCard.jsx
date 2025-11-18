import "./productcard.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useData } from "../../contexts";
import { useUserActions, useToast } from "../../hooks";

const ProductCard = ({ product }) => {
  const location = useLocation();
  const { data } = useData();
  const navigate = useNavigate();
  const token = localStorage.getItem("login");
  const { addWish, deleteWish, addCart } = useUserActions();
  const { infoToast } = useToast();

  const wish = data.wishlist.some((item) => item.title === product.title)
    ? "fas fa-heart wishlisted"
    : "far fa-heart";

  return (
    <div
      className={
        product.outofstock
          ? "card-container vertical overlay"
          : "card-container vertical"
      }
      key={product._id}
    >
      <div className="card-img vertical-img border-bottom">
        <img
          src={product.image}
          alt={product.title}
          onClick={() => {
            navigate(`/singleproduct/${product._id}`);
            infoToast("Entering Single Product Page...");
          }}
        />
      </div>
      <div className="card-details card-details-vertical">
        <h2 className="card-heading">
          {product.title}
          <span>
            {product.outofstock ? (
              <i className="far fa-heart"></i>
            ) : (
              <i
                className={wish}
                onClick={() => {
                  token
                    ? wish === "far fa-heart"
                      ? addWish(product)
                      : deleteWish(product._id)
                    : navigate("/login", { state: { from: location } });
                }}
              ></i>
            )}
          </span>
        </h2>
        <div className="rating text-sm">
          <span className="rating-value">
            {product.rating}
            <i className="fa fa-star checked margin-l"></i>
          </span>
          (<span className="rating-number">2333</span>)
        </div>
        <h4 className="product-price">
          Rs.{product.price}/kg{" "}
          <span className="original-price text-strike-through">
            Rs.{(product.price * (1 + product.discount / 100)).toFixed(0)}
          </span>
          <span className="discount-percentage">{product.discount}% off</span>
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
            <button className="btn btn-icon-text-primary-outline">
              <span className="btn-icon">
                <i className="fa fa-shopping-basket margin-r"></i>
              </span>
              Go To Basket
            </button>
          </Link>
        ) : (
          <button
            className="btn btn-icon-text-primary-outline"
            onClick={() => {
              token
                ? addCart(product, token)
                : navigate("/login", { state: { from: location } });
            }}
          >
            <span className="btn-icon">
              <i className="fa fa-shopping-basket margin-r"></i>
            </span>
            Add to Basket
          </button>
        )}
      </div>
      {product.offer && (
        <div className="badge badge-offer 20-off">
          <span></span>
        </div>
      )}
      {product.outofstock && (
        <span className="card-text-overlay out-of-stock">
          <h2>Out of Stock</h2>
        </span>
      )}
    </div>
  );
};

export { ProductCard };
