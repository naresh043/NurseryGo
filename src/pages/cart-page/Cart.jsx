import "./cart.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useUserActions } from "../../hooks";
import { Loader } from "../../components";
import { setCartPriceDetails, setCheckoutCart } from "../../redux/slices/dataSlice"; // 👈 FIXED IMPORT

export default function Cart() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const { loading, loadText } = data;
  const { addWish, deleteCart, incrementCart, decrementCart } = useUserActions();

  // 🧮 CALCULATIONS (Done before return)
  const cartPrice = data.cart.reduce((acc, item) => acc + item.qty * item.price, 0);
  const cartDiscount = data.cart.reduce(
    (acc, item) => acc + item.qty * ((item.price * item.discount) / 100),
    0
  );
  const cartQty = data.cart.reduce((acc, item) => acc + item.qty, 0);
  const deliveryCharge = data.cart.length * 15;
  const totalAmount = cartPrice + deliveryCharge;

  return loading ? (
    <Loader text={loadText} />
  ) : (
    <>
      {data.cart.length > 0 ? (
        <div className="grid-container cart-container">
          <p className="product-page-heading text-lg text-bold">
            MY BASKET (
            <span className="no-items-in-cart">{data.cart.length}</span> )
          </p>

          <div className="cart-products">
            {/* 🧺 CART ITEMS */}
            <section className="cart-items">
              {data.cart.map((item) => (
                <div className="card-container horizontal" key={item._id}>
                  <div className="card-img horizontal-img border-right">
                    <img src={item.image} alt={item.title} />
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
                    </div>

                    <h4 className="product-price">
                      Rs.{item.price}/kg{" "}
                      <span className="original-price text-strike-through">
                        Rs.{(item.price * (1 + item.discount / 100)).toFixed(0)}
                      </span>
                      <span className="discount-percentage">
                        {item.discount}% off
                      </span>
                    </h4>

                    <span className="qty-scale text-md">
                      Quantity:
                      <button
                        className={`dec ${item.qty <= 1 ? "disable" : ""}`}
                        onClick={() => decrementCart(item)}
                      >
                        -
                      </button>
                      <div className="count">{item.qty}</div>
                      <button className="inc" onClick={() => incrementCart(item)}>
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
              ))}
            </section>

            {/* 💰 PRICE DETAILS */}
            <section className="item-data margin-t">
              <h3 className="text-md">Price Details</h3>
              <hr />
              <p>Price <span className="rate">Rs.{cartPrice}</span></p>
              <p>Discount <span className="rate">-Rs.{cartDiscount}</span></p>
              <p>Delivery Charge <span className="rate">Rs.{deliveryCharge}</span></p>
              <hr />
              <h3 className="text-md">
                Total Amount <span className="rate">Rs.{totalAmount}</span>
              </h3>
              <hr />
              <p>You will save Rs.{cartDiscount} on this order</p>

              <button
                className="btn btn-outline-primary margin-t"
                onClick={() => {
                  dispatch(
                    setCartPriceDetails({
                      price: cartPrice,
                      discount: cartDiscount,
                      deliveryCharge,
                      total: totalAmount,
                    })
                  );
                  dispatch(setCheckoutCart(data.cart)); // 👈 FIXED
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
