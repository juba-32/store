import "./Cart.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import {
  decrement,
  increment,
  removeFromCart,
  resetCart,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Cart() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const m = useTheme();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.cart);
  const qty = useSelector((state) => state.cart.qty);

  let total = 0;
  let discount = 0;
  let suptotal = 0;

  cartItems.forEach((pro) => {
    total += pro.price * pro.qty;
    discount += (pro.discount || 0) * pro.qty;
  });
  suptotal = total - discount;

  return (
    <div>
      <div className="cart-container">
        <h1>
          {t("cart.Shopping cart")}
          <span>
            ({qty} {t("cart.items")})
          </span>
        </h1>
        {cartItems.length === 0 ? (
          <h1
            style={{
              color: "red",
              marginTop: "150px",
              display: "flex",
              justifyContent: "center",
              textTransform: "capitalize",
            }}
          >
            {t("cart.your cart is empty")}
          </h1>
        ) : (
          cartItems?.map((pro) => (
            <div
              style={{
                backgroundColor: m.palette.background.BG,
                color: m.palette.text.primary,
              }}
              className="cart-product"
              key={pro.id}
            >
              <div className="cart-img">
                <img src={pro.image} alt="" />
              </div>
              <div className="cart-details">
                <h5>{pro.title}</h5>
                <p>
                  <strong>{t("cart.color")}</strong> : {pro.color}
                </p>
                <p>
                  <strong>{t("cart.Price")}</strong> : {pro.price}
                </p>
                <div className="qty">
                  <b>{t("cart.Qty")} : </b>
                  <button
                    style={{
                      backgroundColor: m.palette.background.paper,
                      color: m.palette.text.primary,
                      border: "1px solid",
                      borderRadius: "0",
                    }}
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
                  <button
                    style={{
                      backgroundColor: m.palette.background.paper,
                      color: m.palette.text.primary,
                      border: "1px solid",
                      borderRadius: "0",
                    }}
                    onClick={() => {
                      dispatch(increment(pro.id));
                    }}
                  >
                    <AddIcon />
                  </button>
                </div>
                <button
                  onClick={() => {
                    dispatch(removeFromCart(pro.id));
                  }}
                  className="delete-btn"
                >
                  {t("cart.remove")}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div
          className="Order-Summary"
          style={{
            backgroundColor: m.palette.background.BG,
            color: m.palette.text.primary,
          }}
        >
          <h2>{t("cart.Order Summary")}</h2>
          <hr />
          <div>
            <p>{t("cart.Price")}:</p>
            <span>${total.toFixed(2)}</span>
          </div>
          <div>
            <p>{t("cart.Delivery")}: </p>
            <span style={{ color: "green" }}>Free</span>
          </div>
          <div>
            <p>{t("cart.Discount")}: </p>
            <span style={{ color: "red" }}>${discount.toFixed(2)}</span>
          </div>
          <hr />
          <div>
            <b>{t("cart.Subtotal")}: </b>
            <span>${suptotal.toFixed(2)}</span>
          </div>
          <button>{t("cart.procced to pay")}</button>
        </div>
      )}

      <div className="cart-header-btns">
        <button onClick={() => navigate(-1)}>
          {" "}
          {t("cart.continue shopping")}{" "}
        </button>

        {cartItems.length > 0 && (
          <div
            onClick={() => {
              dispatch(resetCart());
            }}
            className="cart-delete-btn"
          >
            {t("cart.delete all")}
          </div>
        )}
      </div>
    </div>
  );
}
