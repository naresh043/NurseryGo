import "./checkout.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../../hooks";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartPriceDetails, address } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();
  const { warningToast, successToast } = useToast();
  const [deliveryAddress, setDeliveryAddress] = useState();

  const doPayment = () => {
    const options = {
      key: "rzp_test_FKsgyFO1LyEuxU",
      key_secret: "B5IjUO1TmcjmfDw34KMI4f8X",
      amount: cartPriceDetails.total * 100, // ✅ FIXED
      currency: "INR",
      name: "FreshBuy",
      description: "Thank you for choosing FreshBuy",
      handler: function (response) {
        dispatch({
          type: "LOAD_ORDERS",
          payload: {
            items: cart,
            address: deliveryAddress,
            totalAmount: cartPriceDetails.total,
            paymentId: response.razorpay_payment_id,
          },
        });
        successToast("Congratulations...Your Order Placed");
        navigate("/orders");
      },
      prefill: {
        name: "Naresh",
        email: "test@gmail.com",
        contact: "9999999999",
      },
      theme: { color: "#0bb32f" },
    };
    const pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div className="checkout-grid">
      <div className="address-container">
        <div className="all-address">
          <h1 className="text-center">Addresses</h1>
          {address?.map((addres) => {
            return (
              <label className="address-data current margin-b" key={addres._id}>
                <input
                  type="radio"
                  name="address"
                  onClick={() => setDeliveryAddress(addres)}
                />
                <div className="address-details text-md margin-l">
                  <div className="text-md text-bold">{addres.name},</div>
                  <div>
                    {addres.building}, {addres.city},
                  </div>
                  <div>
                    {addres.country}, {addres.pincode},
                  </div>
                  <div>{addres.phone}</div>
                </div>
              </label>
            );
          })}
        </div>
      </div>
      <div className="order-details">
        <section className="item-data margin-t">
          <div className="coupon">
            <span className="text-md text-bold">Apply Coupen</span>{" "}
            <button className="coupon-btn btn btn-outline-primary">
              Apply
            </button>
          </div>
          <h3 className="text-md">Order Details</h3>
          <hr />
          {cart.map((item) => {
            // FIXED
            return (
              <div className="order-detail" key={item._id}>
                <span>{item.title}</span>
                <span>{item.qty}</span>
              </div>
            );
          })}
          <hr />
          <h3 className="text-md">Price Details</h3>
          <hr></hr>
          <p>
            Price <span className="rate">Rs.{cartPriceDetails.price}</span>
          </p>
          <p>
            Discount{" "}
            <span className="rate">-Rs.{cartPriceDetails.discount}</span>
          </p>
          <p>
            Delivery Charge{" "}
            <span className="rate">
              Rs.{cartPriceDetails.deliveryCharge}
            </span>
          </p>
          <hr />
          <h3 className="text-md">
            Total Amount{" "}
            <span className="rate">Rs.{cartPriceDetails.total}</span>
          </h3>
          <hr />
          <p>You will save Rs.{cartPriceDetails.discount} on this order</p>
          <hr />

          {deliveryAddress ? (
            <>
              <p className="text-md text-bold">Deliver To :</p>
              <div className="address-data margin-b">
                <div className="address-details text-md margin-l">
                  <div className="text-md text-bold">
                    {deliveryAddress.name},
                  </div>
                  <div>
                    {deliveryAddress.building}, {deliveryAddress.city},
                  </div>
                  <div>
                    {deliveryAddress.country}, {deliveryAddress.pincode},
                  </div>
                  <div>{deliveryAddress.phone}</div>
                </div>
              </div>
            </>
          ) : null}
          <button
            className="btn btn-outline-primary margin-t"
            onClick={() =>
              deliveryAddress
                ? doPayment()
                : warningToast("Please select Delivery Address")
            }
          >
            Place Order
          </button>
        </section>
      </div>
    </div>
  );
}
