import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton, Box, Modal } from "@mui/material";
import SinglePro from "../../components/singlePro/SinglePro";
import Navbar from "../../components/navbar/Navbar";
import "../../styles/FetchData.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { useTheme } from "@mui/material";
import Filter from "../filter/Filter";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../toast/Toast";
export default function UseFetchData({ url }) {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.cart.searchQuery);
  const m = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [productid, setProductid] = useState(null);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [sort, setSort] = useState("all");
  const [loading, setLoading] = useState(true);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("info");

  useEffect(() => {
    setLoading(true);
    axios.get(url).then((response) => {
      setData(response.data.products);
      setOriginalData(response.data.products);
      setLoading(false);
    });
  }, [url]);

  const handleProductClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setProductid(id);
    setOpen(true);
  };

  const handleAddToCart = (pro) => {
    dispatch(addToCart(pro));
    setToastMessage(`Successfully added to cart!`);
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
  const filterProducts = () => {
    let filteredData = [...originalData];

    if (searchQuery && searchQuery.trim() !== "") {
      filteredData = filteredData.filter((pro) =>
        pro?.title.toLowerCase().includes(searchQuery?.toLowerCase())
      );
    }

    if (sort === "Cheap") {
      filteredData = filteredData.filter((pro) => pro.price < 100);
    } else if (sort === "Expensive") {
      filteredData = filteredData.filter((pro) => pro.price >= 100);
    } else if (sort === "Sale") {
      filteredData = filteredData.filter((pro) => pro.discount > 0);
    }

    console.log("Search Query:", searchQuery);
    console.log("Original Data:", originalData);
    console.log("Filtered Products:", filteredData);
    return filteredData;
  };

  return (
    <div className="section">
      <div
        className="products-header"
        style={{ backgroundColor: m.palette.background.BG }}
      >
        <Swiper
          dir="ltr"
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          style={{ height: "40vh", position: "relative" }}
          speed={600}
          parallax={true}
          navigation={true}
          modules={[Parallax, Autoplay, Navigation]}
          className="mySwiper"
        >
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
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="product-modal"
        aria-describedby="product-details"
      >
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

      <Navbar />
      <Filter setSort={setSort} />

      <div className="products">
        {loading ? (
          Array.from(new Array(15)).map((_, index) => (
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
        ) : filterProducts().length === 0 ? (
          <div className="no-items-wrapper">
            <h1>No items match your search</h1>
          </div>
        ) : (
          filterProducts().map((pro) => (
            <div className="product-card" key={pro.id}>
              <img
                className="product-image"
                src={pro.image}
                alt={pro.title}
                onClick={(e) => handleProductClick(e, pro.id)}
              />
              <p className="product-description">{pro.title}</p>
              <div className="addpro">
                <span>${pro.price}</span>
                <ShoppingCartIcon
                  sx={{
                    color: m.palette.text.primary,
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
