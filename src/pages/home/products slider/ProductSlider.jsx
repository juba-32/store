import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./ProductSlider.css";
import { useEffect, useState } from "react";
import axios from "axios";
import useModal from "../../../hooks/useModal";
import SinglePro from "../../products/product Model/SinglePro";
import { Box, Modal } from "@mui/material";
import useToast from "../../../hooks/useToast";
import ProductCard from "../../../pages/products/ProductCard";
import Toast from "../../../components/toast/Toast";
import { useTranslation } from "react-i18next";

export default function ProductSlider() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const { open, productId, openModal, closeModal } = useModal();
  const { toastOpen, toastMessage, toastSeverity, showToast, closeToast } =
    useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://node-api-projects.vercel.app/products?limit=10",
        );
        setProducts(res.data);
        console.log(res.data, "Products fetched successfully");
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  if (!products.length) return null;

  return (
    <div className="product-slider">
      <h2>{t("product Slider.title")}</h2>
      <Modal open={open} onClose={closeModal}>
        <Box className="product-modal-box">
          {productId && (
            <SinglePro
              open={open}
              handleClose={closeModal}
              showToast={showToast}
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
            <ProductCard
              pro={product}
              openModal={openModal}
              showToast={showToast}
            />
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
