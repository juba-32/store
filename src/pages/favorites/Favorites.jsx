import React from "react";
import "./Favorites.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";
// قم بعمل import للأكشنز الخاصة بك من الـ slice
import { removeFromFavorites, addToCart } from "../../redux/cartSlice"; 

export default function Favorites() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  // جلب عناصر المفضلة من الريدكس (تأكد من مطابقة المسار حسب الـ Store عندك)
  const favoriteItems = useSelector((state) => state.cart?.favorites || []);

  return (
    <div
      className="favorites-page"
      style={{
        "--bg": theme.palette.background.default,
        "--card-bg": theme.palette.background.paper,
        "--text": theme.palette.text.primary,
        "--muted-text": theme.palette.text.secondary,
        "--border": theme.palette.divider,
      }}
    >
      <div className="favorites-container">
        <h1 className="favorites-title">
          {t("favorites.Wishlist")} 
          <span> ({favoriteItems.length} {t("cart.items")})</span>
        </h1>

        {favoriteItems.length === 0 ? (
          <div className="empty-favorites">
            <FavoriteIcon className="empty-fav-icon" />
            <h2>{t("favorites.your wishlist is empty")}</h2>
            <button onClick={() => navigate("/")} className="shop-now-btn">
              {t("cart.continue shopping")}
            </button>
          </div>
        ) : (
          <div className="favorites-grid">
            {favoriteItems.map((pro) => (
              <div className="fav-product-card" key={pro.id || pro._id}>
                {/* زر الحذف السريع من المفضلة */}
                <button 
                  className="fav-remove-badge"
                  onClick={() => dispatch(removeFromFavorites(pro.id || pro._id))}
                  title={t("cart.remove")}
                >
                  <DeleteOutlineIcon />
                </button>

                <div className="fav-img-wrapper" onClick={() => navigate(`/product/${pro.id || pro._id}`)}>
                  <img src={pro.image} alt={pro.title} />
                </div>

                <div className="fav-details">
                  <h5>{pro.title}</h5>
                  <p className="fav-price">${pro.price}</p>
                  
                  {pro.color && (
                    <p className="fav-color">
                      <strong>{t("cart.color")}</strong>: {pro.color}
                    </p>
                  )}

                  {/* أزرار التحكم بداخل الكارد */}
                  <div className="fav-card-actions">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => dispatch(addToCart(pro))}
                    >
                      <ShoppingCartIcon className="btn-icon" />
                      {t("product.add to cart")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* زر العودة للتسوق في الأسفل إذا كانت القائمة مليئة */}
        {favoriteItems.length > 0 && (
          <div className="fav-footer-btns">
            <button onClick={() => navigate(-1)}>
              {t("cart.continue shopping")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}