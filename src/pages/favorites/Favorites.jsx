import React from "react";
import "./Favorites.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";
import { removeFromFavorites } from "../../redux/cartSlice"; 
import useModal from "../../hooks/useModal";
import useToast from "../../hooks/useToast";
import SinglePro from "../products/product Model/SinglePro";
import ProductCard from "../products/ProductCard"; 
import Toast from "../../components/toast/Toast";

export default function Favorites() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  
  const favoriteItems = useSelector((state) => state.cart?.favorites || []);

  const { open, productId, openModal, closeModal } = useModal();
  const { toastOpen, toastMessage, toastSeverity, showToast, closeToast } = useToast();

  return (
    <div
      className="favorites-page"
      style={{
        "--bg": theme.palette.palette?.background?.default || theme.palette.background.default,
        "--card-bg": theme.palette.palette?.background?.paper || theme.palette.background.paper,
        "--text": theme.palette.palette?.text?.primary || theme.palette.text.primary,
        "--muted-text": theme.palette.palette?.text?.secondary || theme.palette.text.secondary,
        "--border": theme.palette.palette?.divider || theme.palette.divider,
      }}
    >
      <div className="favorites-container">
        <h1 className="favorites-title">
          {t("favorites.Wishlist")} 
          <span> ({favoriteItems.length} {t("cart.items")})</span>
        </h1>

        {productId && (
          <SinglePro
            open={open}
            handleClose={closeModal}
            productid={productId}
            showToast={showToast}
          />
        )}

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
              <div className="fav-card-wrapper" key={pro._id || pro.id} style={{ position: "relative" }}>
                
                <button 
                  className="fav-remove-badge"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeFromFavorites(pro._id || pro.id));
                    showToast("Removed from favorites", "info");
                  }}
                  title={t("cart.remove")}
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    zIndex: 10,
                    backgroundColor: "var(--card-bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#ff385c",
                    transition: "all 0.2s ease"
                  }}
                >
                  <DeleteOutlineIcon style={{ fontSize: "20px" }} />
                </button>

                <ProductCard 
                  pro={pro} 
                  openModal={openModal} 
                  showToast={showToast} 
                />
              </div>
            ))}
          </div>
        )}

        {favoriteItems.length > 0 && (
          <div className="fav-footer-btns">
            <button onClick={() => navigate(-1)}>
              {t("cart.continue shopping")}
            </button>
          </div>
        )}
      </div>

      <Toast
        open={toastOpen}
        onClose={closeToast}
        message={toastMessage}
        severity={toastSeverity}
      />
    </div>
  );
}