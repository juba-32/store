import "./Checkout.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { resetCart } from "../../redux/cartSlice";
import { getUser } from "../../utils/Helper";
import { useState } from "react";

export default function Checkout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = getUser();

  const cartItems = useSelector((state) => state.cart.cart);

  const [loading, setLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const handlePlaceOrder = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (
      !shippingInfo.fullname ||
      !shippingInfo.email ||
      !shippingInfo.phone ||
      !shippingInfo.address
    ) {
      alert("Please fill all shipping fields");
      return;
    }

    const orderData = {
      items: cartItems.map((item) => ({
        product: item._id,
        title: item.title,
        price: item.price,
        qty: item.qty,
      })),
      shippingInfo,
      paymentMethod: "cod",
      subtotal,
    };

    try {
      setLoading(true);
      await axios.post(
        "https://node-api-projects.vercel.app/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      dispatch(resetCart());
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-left glass">
          <h2>{t("checkout.shipping info")}</h2>

          <input
            name="fullname"
            placeholder="Full Name"
            onChange={handleChange}
          />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="address" placeholder="Address" onChange={handleChange} />
        </div>

        <div className="checkout-right glass">
          <h2>{t("checkout.order summary")}</h2>

          {cartItems.map((item) => (
            <div key={item._id} className="summary-item">
              <div className="summary-left">
                <img src={item.image} alt={item.title} />
                <span className="qty-badge">{item.qty}</span>
              </div>
              <span className="item-price">
                ${(item.price * item.qty).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="summary-line total">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button
            className="pay-btn"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : t("checkout.place order")}
          </button>

          <button className="back-btn" onClick={() => navigate("/cart")}>
            {t("checkout.back to cart")}
          </button>
        </div>
      </div>
    </div>
  );
}
