import { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useProductActions from "../../hooks/useProductActions";
import { useTranslation } from "react-i18next";

export default function ProductCard({ pro, openModal, showToast }) {
  const { i18n } = useTranslation(); 
  const currentLang = i18n.language || "en";

  const { isFavorite, handleFavClick, handleAddToCart } = useProductActions(pro, showToast);
  const productImages = pro.images && pro.images.length > 0 
    ? pro.images.slice(0, 4) 
    : [pro.image];

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const handleMouseEnter = () => {
    if (productImages.length <= 1) return;
    const id = setInterval(() => {
      setCurrentImgIndex((prevIndex) => (prevIndex + 1) % productImages.length);
    }, 2000);
    setIntervalId(id);
  };

  const handleMouseLeave = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setCurrentImgIndex(0); 
  };

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const displayTitle = pro.title?.[currentLang] || pro.title?.["en"] || "";
  const displayDescription = pro.description?.[currentLang] || pro.description?.["en"] || "Crossing hardwood comfort with off-court flair.";

  return (
    <div className="new-product-card">
      <div 
        className="card-media-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`card-fav-btn ${isFavorite ? "fav-active" : ""}`}
          onClick={handleFavClick}
        >
          {isFavorite ? (
            <FavoriteIcon className="fav-icon-ui" style={{ color: "#ff385c" }} />
          ) : (
            <FavoriteBorderIcon className="fav-icon-ui" />
          )}
        </div>

        <div className="card-images-slider" onClick={() => openModal(pro._id)}>
          <div className="slider-track-modern">
            <img
              className="slider-single-img fade-in-animation"
              key={currentImgIndex}
              src={productImages[currentImgIndex]}
              alt={`${displayTitle} - ${currentImgIndex + 1}`}
            />
          </div>
        </div>

        {productImages.length > 1 && intervalId && (
          <div className="slider-dots-indicator">
            {productImages.map((_, idx) => (
              <span 
                key={idx} 
                className={`slider-dot ${currentImgIndex === idx ? "active-dot" : ""}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="card-info-content">
        <h3 className="card-product-title">{displayTitle}</h3>
        <p className="card-product-description">{displayDescription}</p>

        <div className="card-action-footer">
          <div className="price-box">
            <span className="price-label">PRICE</span>
            <span className="price-amount">${pro.price}</span>
          </div>

          <button
            className="card-add-to-cart-btn"
            onClick={() => handleAddToCart(1)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}