import { useEffect, useState } from "react";
import "./SinglePro.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme, CircularProgress, IconButton } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../utils/Helper";
import useProductActions from "../../../hooks/useProductActions";
export default function SinglePro({ open, handleClose, productid, showToast }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = getUser();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("DETAILS");

  const { isFavorite, handleFavClick, handleAddToCart } = useProductActions(
    product,
    showToast,
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  useEffect(() => {
    if (productid) {
      setLoading(true);
      axios
        .get(`https://node-api-projects.vercel.app/products/${productid}`)
        .then((res) => {
          setProduct(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [productid]);

  useEffect(() => {
    if (product) {
      if (product.images && product.images.length > 0) {
        setSelectedImg(product.images[0]);
      } else if (product.image) {
        setSelectedImg(product.image);
      }
    }
  }, [product]);

  if (loading) {
    return (
      <div className="product-loading-container">
        <CircularProgress color="success" />
      </div>
    );
  }

  if (!product) {
    return <div className="product-error-container">Product not found.</div>;
  }

  const finalPrice = product.discount
    ? product.price - product.discount
    : product.price;

  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <div
      className="single-product-container"
      style={{
        "--bg": theme.palette.background.default,
        "--card-bg": theme.palette.background.paper,
        "--text": theme.palette.text.primary,
        "--muted-text": theme.palette.text.secondary,
        "--border": theme.palette.divider,
      }}
    >
      <IconButton
        className="modal-close-btn"
        onClick={handleClose}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>
      <div className="product-gallery-section">
        <div className="main-image-box">
          <img src={selectedImg} alt={product.title} />
        </div>
        <div className="thumbnails-wrapper">
          {productImages.map(
            (imgUrl, index) =>
              imgUrl && (
                <div
                  key={index}
                  className={`thumbnail-card ${selectedImg === imgUrl ? "active-thumb" : ""}`}
                  onClick={() => setSelectedImg(imgUrl)}
                >
                  <img src={imgUrl} alt={`thumb-${index}`} />
                </div>
              ),
          )}
        </div>
      </div>

      <div className="product-info-section">
        <div className="product-breadcrumbs">
          <span>{product.category}</span>
          {product.brand && (
            <span>
              {" > "} {product.brand}
            </span>
          )}
          {product.model && (
            <span>
              {" > "} {product.model}
            </span>
          )}
        </div>

        <h1 className="product-main-title">{product.title}</h1>

        <div className="stock-status-badge">
          {product.inStock ? (
            <span className="status-in">In Stock</span>
          ) : (
            <span className="status-out">Out of Stock</span>
          )}
        </div>

        <div className="product-price-row">
          <span className="current-price">${finalPrice.toFixed(2)}</span>
          {product.discount > 0 && (
            <span className="old-price">${product.price.toFixed(2)}</span>
          )}
          {product.discount > 0 && (
            <span className="discount-badge-text">
              Save ${product.discount}
            </span>
          )}
        </div>

        <div className="product-tabs-header">
          {["DETAILS", "SPECIFICATIONS"].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "tab-active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-content-body">
          {activeTab === "DETAILS" && (
            <div className="details-wrapper">
              <p>
                {product.description ||
                  "No description available for this product."}
              </p>
            </div>
          )}
          {activeTab === "SPECIFICATIONS" && (
            <div className="specs-wrapper">
              {product.brand && (
                <p>
                  <strong>Brand:</strong> {product.brand}
                </p>
              )}
              {product.model && (
                <p>
                  <strong>Model:</strong> {product.model}
                </p>
              )}
              {product.color && (
                <p>
                  <strong>Color:</strong> {product.color}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="option-select-group" style={{ marginTop: "10px" }}>
          <span className="option-label">Quantity:</span>
          <div className="quantity-counter-box">
            <button onClick={() => setQuantity((p) => (p > 1 ? p - 1 : 1))}>
              <RemoveIcon style={{ fontSize: "16px" }} />
            </button>
            <span className="qty-number-display">{quantity}</span>
            <button onClick={() => setQuantity((p) => p + 1)}>
              <AddIcon style={{ fontSize: "16px" }} />
            </button>
          </div>
        </div>

        <div className="product-actions-footer-row">
          <button
            className="buy-now-action-btn"
            onClick={() => {
              handleAddToCart(quantity);
              user ? navigate("/cart") : navigate("/register");
            }}
            disabled={!product.inStock}
          >
            Buy now
          </button>

          <button
            className="add-to-cart-action-btn"
            onClick={() => handleAddToCart(quantity)}
            disabled={!product.inStock}
          >
            <ShoppingCartIcon className="cart-btn-icon-ui" />
            Add to cart
          </button>

          <button
            className={`fav-circle-action-btn ${isFavorite ? "fav-active" : ""}`}
            onClick={handleFavClick}
          >
            {isFavorite ? (
              <FavoriteIcon style={{ color: "#ff385c" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
