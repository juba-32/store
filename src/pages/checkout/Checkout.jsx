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
    0
  );

  const handlePlaceOrder = async () => {
    // 1. التحقق من تسجيل دخول المستخدم
    if (!user) {
      alert("Please login first to place an order");
      navigate("/login");
      return;
    }

    // 2. التحقق من ملء جميع الحقول
    if (
      !shippingInfo.fullname ||
      !shippingInfo.email ||
      !shippingInfo.phone ||
      !shippingInfo.address
    ) {
      alert("Please fill all shipping fields");
      return;
    }

    // 3. تجهيز بيانات الطلب وتأمين الـ Product ID
    const orderData = {
      items: cartItems.map((item) => ({
        product: item._id || item.id || item.product?._id, // تأمين جلب المعرف بأي صيغة
        qty: item.qty,
      })),
      shippingInfo,
      paymentMethod: "cod", // الدفع عند الاستلام كقيمة افتراضية
    };

    try {
      setLoading(true);

      // 4. إرسال الطلب للباك إيند
      await axios.post(
        "https://node-api-projects.vercel.app/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // إرسال التوكن لفك التشفير وحساب الـ user._id
          },
        }
      );

      // 5. في حال النجاح: تفريغ السلة في الفرونت إيند والتوجيه لصفحة الطلبات
      dispatch(resetCart());
      alert("Order placed successfully! 🎉");
      navigate("/orders"); 
    } catch (err) {
      console.error("Checkout Error Details:", err.response?.data || err);
      // إظهار رسالة الخطأ القادمة من السيرفر مباشرة لتسهيل التتبع
      alert(`Order failed: ${err.response?.data?.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* حقول معلومات الشحن */}
        <div className="checkout-left glass">
          <h2>{t("checkout.shipping info")}</h2>

          <input
            name="fullname"
            placeholder="Full Name"
            value={shippingInfo.fullname}
            onChange={handleChange}
          />
          <input 
            name="email" 
            placeholder="Email" 
            value={shippingInfo.email}
            onChange={handleChange} 
          />
          <input 
            name="phone" 
            placeholder="Phone" 
            value={shippingInfo.phone}
            onChange={handleChange} 
          />
          <input 
            name="address" 
            placeholder="Address" 
            value={shippingInfo.address}
            onChange={handleChange} 
          />
        </div>

        {/* ملخص الطلب */}
        <div className="checkout-right glass">
          <h2>{t("checkout.order summary")}</h2>

          {cartItems.map((item) => (
            <div key={item._id || item.id} className="summary-item">
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
            disabled={loading || cartItems.length === 0}
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