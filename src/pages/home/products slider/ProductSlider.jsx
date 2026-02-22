import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "swiper/css";
import "./ProductSlider.css";
import { useEffect, useState } from "react";
import axios from "axios";
import useModal from "../../../hooks/useModal";
import SinglePro from "../../../components/product Model/SinglePro";
import { Box, Modal } from "@mui/material";
import useToast from "../../../hooks/useToast";
import useCartActions from "../../../hooks/useCartActions";
import Toast from "../../../components/toast/Toast";

export default function ProductSlider() {
  const [products, setProducts] = useState([]);
  const { open, productId, openModal, closeModal } = useModal();
  const { toastOpen, toastMessage, toastSeverity, showToast, closeToast } =
    useToast();

  const { handleAddToCart } = useCartActions(showToast);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch only 10 products
        const res = await axios.get(
          "https://node-api-projects.vercel.app/products?limit=10",
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  if (!products.length) return null; // optionally show a loader

  return (
    <div className="product-slider">
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
      <Swiper
        modules={[Autoplay]}
        loop
        spaceBetween={20}
        slidesPerView={4}
        autoplay={{
          delay: 0, // continuous motion
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // stop ONLY on hover
        }}
        speed={4000} // smooth infinite animation
        grabCursor
        breakpoints={{
          0: { slidesPerView: 1.2 },
          600: { slidesPerView: 2.2 },
          900: { slidesPerView: 3.2 },
          1200: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="product-slide">
              <img src={product.image} alt={product.title} onClick={() => openModal(product._id)} />
              <h4 className="product-title">{product.title}</h4>
              <div className="productFooter">
                <span className="product-price">${product.price}</span>

                <ShoppingCartIcon
                  className="cart-icon"
                  onClick={() => handleAddToCart(product)}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Toast
        open={toastOpen}
        onClose={closeToast}
        message={toastMessage}
        severity={toastSeverity}
      />
    </div>
  );
}
