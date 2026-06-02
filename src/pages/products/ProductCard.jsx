import { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../../redux/cartSlice";

// مررنا هنا دالة showToast كـ Prop من الصفحة الأب (Products.jsx)
export default function ProductCard({ pro, openModal, handleAddToCart, showToast }) {
  const dispatch = useDispatch();
  
  // 1. جلب قائمة المفضلة من الريدكس لفحص حالة المنتج الحالي
  const favorites = useSelector((state) => state.cart.favorites) || [];
  const isFavorite = favorites.some((item) => item._id === pro._id);

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

  // 2. دالة التحكم بضغط زر المفضلة وإظهار التوست
  const handleFavClick = (e) => {
    e.stopPropagation(); // منع فتح المودال عند الضغط على القلب
    dispatch(addToFavorites(pro));
    
    // إظهار التويست بناءً على الحالة الجديدة
    if (isFavorite) {
      if (showToast) showToast("Removed from favorites", "info");
    } else {
      if (showToast) showToast("Added to favorites successfully!", "success");
    }
  };

  return (
    <div className="new-product-card">
      <div 
        className="card-media-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* 3. زر المفضلة الذكي: يتغير شكله ولونه تلقائياً */}
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
              alt={`${pro.title} - ${currentImgIndex + 1}`}
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
        <h3 className="card-product-title">{pro.title}</h3>
        <p className="card-product-description">
          {pro.description || "Crossing hardwood comfort with off-court flair. '80s-inspired construction, bold details."}
        </p>

        <div className="card-action-footer">
          <div className="price-box">
            <span className="price-label">PRICE</span>
            <span className="price-amount">${pro.price}</span>
          </div>

          <button
            className="card-add-to-cart-btn"
            onClick={() => handleAddToCart(pro)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}