import "./Orders.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUser } from "../../utils/Helper";
import { useNavigate } from "react-router-dom";

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
    fetchOrders()
  }, [navigate]);

  if (loading) {
    return <div className="orders-loading">Loading orders...</div>;
  }

  return (
    <div className="orders-page">
      <div className="orders-container glass">
        <h2>My Orders</h2>

        {orders.length === 0 && (
          <p className="empty-orders">You have no orders yet</p>
        )}

        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <span className="order-id">Order #{order._id.slice(-6)}</span>
              <span className={`order-status ${order.status}`}>
                {order.status}
              </span>
            </div>

            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.product} className="order-item">
                  <img src={item.product.image} alt="" />
                  <span className="order-qty">×{item.qty}</span>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              <span className="order-total">${order.subtotal.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
