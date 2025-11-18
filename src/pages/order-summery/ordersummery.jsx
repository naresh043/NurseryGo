import "./ordersummery.css";
import { useData } from "../../contexts";
import { useEffect } from "react";
import { useUserActions } from "../../hooks";

export default function OrderSummary() {
  const { data } = useData();
  const { deleteCart } = useUserActions();

  useEffect(() => {
    data.cart.map((item) => deleteCart(item._id));
  }, []);

  return (
    <div className="order-container">
      <h1>Order Summary</h1>
      <div className="order-summary-details">
        <div className="order-info">
          <p className="text-lg text-bold text-primary">Order Confirmed</p>
          <p className="text-md text-bold">
            Payment ID: {data.orders.paymentId}
          </p>
          <p className="text-md text-bold">
            Total Amount: Rs. {data.orders.totalAmount}
          </p>
          <p className="text-md text-bold">Order Will be Delivered To:</p>
          <div className="address-data margin-b">
            <div className="address-details text-md margin-l">
              <div className="text-md text-bold">
                {data.orders.address.name},
              </div>
              <div>
                {data.orders.address.building}, {data.orders.address.city},
              </div>
              <div>
                {data.orders.address.country}, {data.orders.address.pincode},
              </div>
              <div>{data.orders.address.phone}</div>
            </div>
          </div>
        </div>
        <div className="order-items">
          <p className="text-lg text-bold">Ordered Items</p>
          {data.orders.items.map((item) => {
            return (
              <div className="card-container horizontal" key={item._id}>
                <div className="card-img horizontal-img border-right">
                  <img src={item.image} alt="Apple" />
                </div>
                <div className="card-info">
                  <h2 className="card-heading">{item.title}</h2>
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
                      Rs.{(item.price * (1 + item.discount / 100)).toFixed(0)}
                    </span>
                    <span className="discount-percentage">
                      {item.discount}% off
                    </span>
                  </h4>
                  <span className="qty-scale text-md">
                    Quantity:
                    <div className="count">{item.qty}</div>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
