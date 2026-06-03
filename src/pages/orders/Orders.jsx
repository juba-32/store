import "./Orders.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUser } from "../../utils/Helper";
import { useNavigate } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getUser();
    if (!user) {
      navigate("/login");
      return;
    }
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "https://node-api-projects.vercel.app/orders/my",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className="orders-loading-wrapper">
        <div className="spinner"></div>
        <p>Fetching your orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-page-header">
          <ShoppingBagIcon className="main-icon" />
          <div>
            <h2>Order History</h2>
            <p>Track and manage your recent purchases</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders-state">
            <ShoppingBagIcon className="empty-icon" />
            <h3>No orders found</h3>
            <p>Looks like you haven't placed any orders yet.</p>
            <button onClick={() => navigate("/")} className="shop-now-btn">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list-wrapper">
            {orders.map((order) => (
              <div key={order._id} className="order-card-modern glass">
                
                <div className="order-card-header">
                  <div className="header-meta">
                    <span className="order-number">Order #{order._id.slice(-6).toUpperCase()}</span>
                    <div className="date-badge">
                      <CalendarTodayIcon className="inline-icon" />
                      <span>{new Date(order.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                  </div>
                  <span className={`status-pill ${order.status?.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>

                <div className="order-card-body">
                  {order.items?.map((item) => (
                    <div key={item._id || item.product?._id || item.product} className="modern-order-item">
                      <div className="item-img-container">
                        <img 
                          src={item.product?.image || "https://via.placeholder.com/150"} 
                          alt={item.product?.title || "Product"} 
                        />
                      </div>
                      <div className="item-info-text">
                        <h4>{item.product?.title || "Archived Product"}</h4>
                        <p className="item-meta-sub">
                          <span>Price: ${item.product?.price || item.price || 0}</span>
                          <span className="qty-badge">Qty: {item.qty}</span>
                        </p>
                      </div>
                      <div className="item-total-price">
                        ${((item.product?.price || item.price || 0) * item.qty).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-card-footer">
                  <div className="footer-info-group">
                    <span className="label-text">Payment Method</span>
                    <span className="val-text">{order.paymentMethod || "Credit Card"}</span>
                  </div>
                  <div className="footer-price-group">
                    <span className="label-text">Total Amount</span>
                    <span className="total-price-amount">
                      <AttachMoneyIcon className="currency-icon" />
                      {order.subtotal?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}