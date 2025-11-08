import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton, Box, Modal } from "@mui/material";
import SinglePro from "../../components/singlePro/SinglePro";
import "../../styles/FetchData.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { useTheme } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import Toast from "../toast/Toast";
import Price from "../../components/filter/Price";
import Category from "../../components/filter/Category";

export default function UseFetchData({ url }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [productid, setProductid] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState("");
  // const [priceFilter, setPriceFilter] = useState([0, 1000]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("info");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fullUrl = new URL(url, window.location.origin);
        if (categoryFilter)
          fullUrl.searchParams.set("selectCategory", categoryFilter);
        const response = await axios.get(fullUrl.toString());
        console.log("Response:", response.data);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setData([]); // reset if error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url, categoryFilter]);

  const handleProductClick = (_id) => {
    setProductid(_id);
    setOpen(true);
  };

  const handleAddToCart = (pro) => {
    dispatch(addToCart({ ...pro, id: pro._id }));
    setToastMessage("Successfully added to cart!");
    setToastSeverity("success");
    setToastOpen(true);
  };

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") return;
    setToastOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setProductid(null);
  };

  return (
    <div className="section">
      {/* Swiper Banner */}
      <div
        className="products-header"
        style={{ backgroundColor: theme.palette.background.BG }}
      >
        <Swiper
          dir="ltr"
          spaceBetween={30}
          centeredSlides
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          style={{ height: "40vh", position: "relative" }}
          speed={600}
          parallax
          navigation
          modules={[Parallax, Autoplay, Navigation]}
          className="mySwiper"
        >
          {/* Slides */}
          <SwiperSlide
            style={{
              backgroundImage:
                "url(https://dfcdn.defacto.com.tr/Mobile/en_desktop2x_0618d0f1-0990-4b9d-8eeb-eb7b52fc5fe4_e5585d26-33f8-41bd-aca2-28f6753cb80f_DI_383.jpg)",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <SwiperSlide
            style={{
              backgroundImage:
                "url(https://dfcdn.defacto.com.tr/Mobile/en_desktop2x_b868c554-ed8e-4936-94bd-91cdd2ce761a_74c7aeb7-2db5-451d-b712-83ed0ddcd343_DI_383.jpg)",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <SwiperSlide
            style={{
              backgroundImage:
                "url(https://dfcdn.defacto.com.tr/Mobile/desktop2x_155daf6b-1429-49a6-89df-c37add888f57_4cffb5fe-6bff-4af0-8986-3ee1fadc5ff5_DI_383.jpg)",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </Swiper>
      </div>

      {/* Product Modal */}
      <Modal open={open} onClose={handleClose} aria-labelledby="product-modal">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "70%", md: "50%" },
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {productid && (
            <SinglePro
              open={open}
              handleClose={handleClose}
              handleAddToCart={handleAddToCart}
              productid={productid}
            />
          )}
        </Box>
      </Modal>

      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          px: 3,
          py: 1,
          flexWrap: "wrap",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Category setCategoryFilter={setCategoryFilter} />
        {/* <Price priceFilter={priceFilter} setPriceFilter={setPriceFilter} /> */}
      </Box>

      {/* Products */}
      <div className="products">
        {loading ? (
          Array.from(new Array(12)).map((_, index) => (
            <Box key={index} className="product-card">
              <Skeleton
                variant="rectangular"
                width={210}
                height={140}
                sx={{ borderRadius: 2, mb: 1 }}
              />
              <Skeleton width="60%" height={20} />
              <Skeleton width="40%" height={20} />
            </Box>
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
                onClick={() => handleProductClick(pro._id)}
              />
              <p className="product-description">{pro.title}</p>
              <div className="addpro">
                <span>${pro.price}</span>
                <ShoppingCartIcon
                  sx={{
                    color: theme.palette.text.primary,
                    cursor: "pointer",
                    transition: "all 0.1s ease",
                    "&:hover": { color: "lightgreen", transform: "scale(1.2)" },
                    "&:active": { color: "green", transform: "scale(0.9)" },
                  }}
                  onClick={() => handleAddToCart(pro)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <Toast
        open={toastOpen}
        onClose={handleToastClose}
        message={toastMessage}
        severity={toastSeverity}
      />
    </div>
  );
}
