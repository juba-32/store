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

  const favoriteItems = useSelector(
    (state) => state.cart?.favorites || []
  );

  const { open, productId, openModal, closeModal } = useModal();

  const {
    toastOpen,
    toastMessage,
    toastSeverity,
    showToast,
    closeToast,
  } = useToast();

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
          <span>
            {" "}
            ({favoriteItems.length} {t("cart.items")})
          </span>
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

            <button
              className="shop-now-btn"
              onClick={() => navigate("/")}
            >
              {t("cart.continue shopping")}
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {favoriteItems.map((pro) => (
              <div
                className="fav-card-wrapper"
                key={pro._id || pro.id}
              >
                <button
                  className="fav-remove-badge"
                  title={t("cart.remove")}
                  onClick={(e) => {
                    e.stopPropagation();

                    dispatch(
                      removeFromFavorites(pro._id || pro.id)
                    );

                    showToast(
                      t("favorites.removed") ||
                        "Removed from wishlist",
                      "success"
                    );
                  }}
                >
                  <DeleteOutlineIcon />
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