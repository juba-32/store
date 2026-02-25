import { useEffect, useState } from "react";
import { Skeleton, Box, Modal } from "@mui/material";
import SinglePro from "./product Model/SinglePro";
import Category from "../../components/filter/Category";
import Price from "../../components/filter/Price";
import "./Products.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
            <div className="product-card" key={pro._id}>
              <img
                className="product-image"
                src={pro.image}
                alt={pro.title}
                onClick={() => openModal(pro._id)}
              />

              <p className="product-description">{pro.title}</p>

              <div className="product-footer">
                <span className="product-price">${pro.price}</span>

                <ShoppingCartIcon
                  className="cart-icon"
                  onClick={() => handleAddToCart(pro)}
                />
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
