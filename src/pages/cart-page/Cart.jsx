import "./cart.css";
import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts";
import { useUserActions } from "../../hooks";
import { Loader } from "../../components";
export default function Cart() {
  const navigate = useNavigate();
  const { data, dispatch, loading, loadText } = useData();
  const { addWish, deleteCart, incrementCart, decrementCart } =
    useUserActions();
  let cartPrice = 0;
  let cartDiscount = 0;
  let cartQty = 0;

  return loading ? (
    <Loader text={loadText} />
  ) : (
    <>
      {data.cart.length > 0 ? (
        <div className="grid-container cart-container">
          <p className="product-page-heading text-lg text-bold">
            MY BASKET({" "}
            <span className="no-items-in-cart">{data.cart.length}</span> )
          </p>
          <div className="cart-products">
            <section className="cart-items">
              {data.cart.map((item) => {
                return (
                  <div className="card-container horizontal" key={item._id}>
                    <div className="card-img horizontal-img border-right">
                      <img src={item.image} alt="Apple" />
                    </div>
                    <div className="card-details card-details-horizontal">
                      <h2 className="card-heading">
                        {item.title}
                        <span>
                          <i
                            className="far fa-heart"
                            onClick={() => {
                              addWish(item);
                              deleteCart(item._id);
                            }}
                          ></i>
                        </span>
                      </h2>
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
                      <span className="qty-scale text-md">
                        Quantity:
                        <button
                          className={`dec ${
                            item.qty <= 1 ? `disable` : undefined
                          }`}
                          onClick={() => decrementCart(item)}
                        >
                          -
                        </button>
                        <div className="count">{item.qty}</div>
                        <button
                          className="inc"
                          onClick={() => incrementCart(item)}
                        >
                          +
                        </button>
                      </span>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => deleteCart(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </section>

            {data.cart.forEach((item) => {
              cartPrice = cartPrice + item.qty * item.price;
              cartDiscount =
                cartDiscount + item.qty * ((item.price * item.discount) / 100);
              cartQty = cartQty + item.qty;
            })}

            <section className="item-data margin-t">
              <h3 className="text-md">Price Details</h3>
              <hr></hr>
              <p>
                Price <span className="rate">Rs.{cartPrice}</span>
              </p>
              <p>
                Discount <span className="rate">-Rs.{cartDiscount}</span>
              </p>
              <p>
                Delivery Charge{" "}
                <span className="rate">Rs.{data.cart.length * 15}</span>
              </p>
              <hr></hr>
              <h3 className="text-md">
                Total Amount{" "}
                <span className="rate">
                  Rs.{cartPrice + data.cart.length * 15}
                </span>
              </h3>
              <hr></hr>
              <p>You will save Rs.{cartDiscount} on this order</p>
              <button
                className="btn btn-outline-primary margin-t"
                onClick={() => {
                  dispatch({
                    type: "CART_PRICE",
                    payload: {
                      price: cartPrice,
                      discount: cartDiscount,
                      deliveryCharge: data.cart.length * 15,
                      total: cartPrice + data.cart.length * 15,
                    },
                  });
                  navigate("/checkout");
                }}
              >
                Checkout
              </button>
            </section>
          </div>
        </div>
      ) : (
        <div className="cart-container">
          <p className="product-page-heading text-lg text-bold">
            No product added to your Basket
          </p>
        </div>
      )}
    </>
  );
}
