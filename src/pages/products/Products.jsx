import { useEffect, useState } from "react";
import { Skeleton, Box, Modal } from "@mui/material";
import SinglePro from "./product Model/SinglePro";
import Category from "../../components/filter/Category";
import Price from "../../components/filter/Price";
import "./Products.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../components/toast/Toast";
import useProducts from "../../hooks/useProducts";
import useModal from "../../hooks/useModal";
import useToast from "../../hooks/useToast";
import useCartActions from "../../hooks/useCartActions";
import { clearCategory, clearSearch } from "../../redux/cartSlice";

export default function Products({ url }) {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.cart.searchQuery);
  const category = useSelector((state) => state.cart.category);
  const [priceFilter, setPriceFilter] = useState([0, 1000]);
  const { data, loading } = useProducts(
    url,
    category,
    priceFilter,
    searchQuery,
  );
  console.log(url);
  const { open, productId, openModal, closeModal } = useModal();

  const { toastOpen, toastMessage, toastSeverity, showToast, closeToast } =
    useToast();

  const { handleAddToCart } = useCartActions(showToast);

  useEffect(() => {
    return () => {
      dispatch(clearSearch());
      dispatch(clearCategory());
    };
  }, [dispatch]);
  return (
    <div className="products-page">
      {/* Modal */}
      <Modal open={open} onClose={closeModal}>
        <Box className="product-modal-box">
          {productId && (
            <SinglePro
              open={open}
              handleClose={closeModal}
              handleAddToCart={handleAddToCart}
              productid={productId}
            />
          )}
        </Box>
      </Modal>

      <div className="products-filters">
        <Category />
        <Price priceFilter={priceFilter} setPriceFilter={setPriceFilter} />
      </div>

      <div className="products-grid">
        {loading ? (
          Array.from(new Array(12)).map((_, index) => (
            <div key={index} className="product-card">
              <Skeleton className="skeleton-img" variant="rectangular" />
              <Skeleton className="skeleton-line" width="60%" />
              <Skeleton className="skeleton-line" width="40%" />
            </div>
          ))
        ) : data.length === 0 ? (
          <div className="no-items-wrapper">
            <h1>No items match your search</h1>
          </div>
        ) : (
          data.map((pro) => (
            <div className="new-product-card" key={pro._id}>
              {/* حاوية الصورة العلوية مع الجريدينت وأيقونة الفيفورت */}
              <div className="card-media-wrapper">
                {/* أيقونة المفضلة الاحترافية */}
                <div
                  className="card-fav-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    // الأكشن الخاص بالريدكس للمفضلة هنا
                    console.log("Toggle Favorite:", pro._id);
                  }}
                >
                  <FavoriteBorderIcon className="fav-icon-ui" />
                </div>

                {/* سلايدر الصور الأربعة عند الهوفر */}
                <div
                  className="card-images-slider"
                  onClick={() => openModal(pro._id)}
                >
                  <div className="slider-track">
                    {pro.images && pro.images.length > 0 ? (
                      pro.images
                        .slice(0, 4)
                        .map((imgUrl, idx) => (
                          <img
                            key={idx}
                            className="slider-single-img"
                            src={imgUrl}
                            alt={`${pro.title} - ${idx + 1}`}
                          />
                        ))
                    ) : (
                      <img
                        className="slider-single-img"
                        src={pro.image}
                        alt={pro.title}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* تفاصيل المنتج السفلية */}
              <div className="card-info-content">
                <h3 className="card-product-title">{pro.title}</h3>
                <p className="card-product-description">
                  {pro.description ||
                    "Crossing hardwood comfort with off-court flair. '80s-inspired construction, bold details."}
                </p>

                {/* الفوتر المحتوي على السعر وزر الإضافة للكارت */}
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
          ))
        )}
      </div>

      {/* Toast */}
      <Toast
        open={toastOpen}
        onClose={closeToast}
        message={toastMessage}
        severity={toastSeverity}
      />
    </div>
  );
}
