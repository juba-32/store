import "./Cart.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  removeFromCart,
  resetCart,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";
import { getUser } from "../utils/Helper";
const user = getUser();

export default function Cart() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const cartItems = useSelector((state) => state.cart?.cart);
  const qty = useSelector((state) => state.cart.qty);

  // Totals
  let total = 0;
  let discount = 0;

  cartItems.forEach((pro) => {
    total += pro.price * pro.qty;
    discount += (pro.discount || 0) * pro.qty;
  });

  const subtotal = total - discount;

  return (
    <div
      className="cart-page"
      style={{
        "--bg": theme.palette.background.default,
        "--card-bg": theme.palette.background.paper,
        "--text": theme.palette.text.primary,
        "--muted-text": theme.palette.text.secondary,
        "--border": theme.palette.divider,
      }}
    >
      <div className="cart-container">
        <h1>
          {t("cart.Shopping cart")}
          <span>
            ({qty} {t("cart.items")})
          </span>
        </h1>

        {cartItems.length === 0 ? (
          <h1 className="empty-cart">{t("cart.your cart is empty")}</h1>
        ) : (
          cartItems.map((pro) => (
            <div className="cart-product" key={pro.id}>
              <div className="cart-img">
                <img src={pro.image} alt={pro.title} />
              </div>

              <div className="cart-details">
                <h5>{pro.title}</h5>

                <p>
                  <strong>{t("cart.color")}</strong> : {pro.color}
                </p>

                <p>
                  <strong>{t("cart.Price")}</strong> : ${pro.price}
                </p>

                <div className="qty">
                  <b>{t("cart.Qty")} :</b>

                  <button
                    onClick={() => {
                      if (pro.qty > 1) {
                        dispatch(decrement(pro.id));
                      } else {
                        dispatch(removeFromCart(pro.id));
                      }
                    }}
                  >
                    <RemoveIcon />
                  </button>

                  <span>{pro.qty}</span>

                  <button onClick={() => dispatch(increment(pro.id))}>
                    <AddIcon />
                  </button>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => dispatch(removeFromCart(pro.id))}
                >
                  {t("cart.remove")}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ORDER SUMMARY */}
      {cartItems.length > 0 && (
        <div className="Order-Summary">
          <h2>{t("cart.Order Summary")}</h2>
          <hr />

          <div>
            <p>{t("cart.Price")}:</p>
            <span>${total.toFixed(2)}</span>
          </div>

          <div>
            <p>{t("cart.Delivery")}:</p>
            <span className="free-delivery">Free</span>
          </div>

          <div>
            <p>{t("cart.Discount")}:</p>
            <span className="discount-text">-${discount.toFixed(2)}</span>
          </div>

          <hr />

          <div>
            <b>{t("cart.Subtotal")}:</b>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={() => {
              user ? navigate("/checkout") : navigate("/register");
            }}
          >
            {t("cart.procced to pay")}
          </button>
        </div>
      )}

      <div className="cart-header-btns">
        <button onClick={() => navigate(-1)}>
          {t("cart.continue shopping")}
        </button>

        {cartItems.length > 0 && (
          <div
            className="cart-delete-btn"
            onClick={() => dispatch(resetCart())}
          >
            {t("cart.delete all")}
          </div>
        )}
      </div>
    </div>
  );
}
