import "./wishlist.css";
import { useData } from "../../contexts";
import { useUserActions } from "../../hooks";
import { Loader } from "../../components";

export default function Wishlist() {
  const { data, loading, loadText } = useData();
  const { addCart, deleteWish } = useUserActions();

  return loading ? (
    <Loader text={loadText} />
  ) : (
    <>
      {data.wishlist.length > 0 ? (
        <div className="grid-container wishlist-container">
          <p className="product-page-heading text-md text-bold">
            MY WISHLIST({" "}
            <span className="no-items-in-wishlist">{data.wishlist.length}</span>{" "}
            )
          </p>
          <div className="wishlist-products">
            <div className="wishlist-items">
              {data.wishlist.map((item) => {
                return (
                  <div className="card-container vertical" key={item._id}>
                    <div className="card-img vertical-img border-bottom">
                      <img src={item.image} alt="Apple" />
                    </div>
                    <div className="card-details card-details-vertical">
                      <h2 className="card-heading">
                        {item.title}
                        <span>
                          <i
                            className="fas fa-heart wishlisted"
                            onClick={() => deleteWish(item._id)}
                          ></i>
                        </span>
                      </h2>
                      <p className="card-sub-heading">{item.description}</p>
                      <div className="rating text-sm">
                        <span className="rating-value">
                          {item.rating}
                          <i className="fa fa-star checked margin-l"></i>
                        </span>
                        (<span className="rating-number">2333</span>)
                      </div>
                      <h4 className="product-price">
                        Rs.{item.price}/kg{" "}
                        <span className="original-price text-strike-through">
                          Rs.
                          {(item.price * (1 + item.discount / 100)).toFixed(0)}
                        </span>
                        <span className="discount-percentage">
                          {item.discount}% off
                        </span>
                      </h4>
                      <button className="btn btn-icon-text-primary-outline">
                        <span
                          className="btn-icon text-md"
                          onClick={() => {
                            addCart(item);
                            deleteWish(item._id);
                          }}
                        >
                          Move to Basket
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="wishlist-container">
          <p className="product-page-heading text-lg text-bold">
            No product wishlisted
          </p>
        </div>
      )}
    </>
  );
}
