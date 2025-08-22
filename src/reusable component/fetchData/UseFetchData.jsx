import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Fade, Paper, Popper, Skeleton } from "@mui/material";
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
import { useDispatch } from "react-redux";
import { Toast } from "primereact/toast";
export default function UseFetchData({ url }) {
  const dispatch = useDispatch();
  const toastCenter = useRef(null);
  const showMessage = (ref, severity) => {
    const label = "Successfully Added";
    ref.current.show({ severity: severity, detail: label, life: 3000 });
  };
  const m = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [productid, setProductid] = useState(null);
  const [tv, setTv] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("all");
  useEffect(() => {
    axios.get(url).then((response) => {
      setTv(response.data.products);
      setOriginalData(response.data.products);
    });
  }, []);

  const handleProductClick = (event, id) => {
    setAnchorEl(event.target.value);
    setProductid(id);
    setOpen(true);
  };
  const filterProducts = () => {
    let filteredData = [...originalData];
    // Apply search filter
    if (searchQuery !== "") {
      filteredData = filteredData.filter((pro) => {
        return pro.title.toLowerCase().includes(searchQuery);
      });
    } else if (searchQuery) {
      return (
        <h1 style={{ color: "red", textAlign: "center" }}>No Items Found</h1>
      );
    }

    // Apply sorting filter
    if (sort === "Cheap") {
      filteredData = filteredData.filter((pro) => pro.price < 100);
    } else if (sort === "Expensive") {
      filteredData = filteredData.filter((pro) => pro.price >= 100);
    } else if (sort === "Sale") {
      filteredData = filteredData.filter((pro) => pro.discount > 0);
    }

    return filteredData;
  };

  return (
    <div className="section">
      <div
        className="products-header"
        style={{ backgroundColor: m.palette.background.BG }}
      >
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          style={{
            height: "40vh",
          }}
          speed={600}
          parallax={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Parallax, Autoplay, Navigation]}
          className="mySwiper"
        >
          <div
            slot="container-start"
            className="parallax-bg"
            data-swiper-parallax="-23%"
          ></div>
          <SwiperSlide
            style={{
              backgroundImage:
                "url(https://dfcdn.defacto.com.tr/Mobile/en_desktop2x_0618d0f1-0990-4b9d-8eeb-eb7b52fc5fe4_e5585d26-33f8-41bd-aca2-28f6753cb80f_DI_383.jpg)",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></SwiperSlide>
          <SwiperSlide
            style={{
              backgroundImage:
                "url(https://dfcdn.defacto.com.tr/Mobile/en_desktop2x_b868c554-ed8e-4936-94bd-91cdd2ce761a_74c7aeb7-2db5-451d-b712-83ed0ddcd343_DI_383.jpg)",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></SwiperSlide>
          <SwiperSlide
            style={{
              backgroundImage:
                "url(https://dfcdn.defacto.com.tr/Mobile/desktop2x_155daf6b-1429-49a6-89df-c37add888f57_4cffb5fe-6bff-4af0-8986-3ee1fadc5ff5_DI_383.jpg)",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></SwiperSlide>
        </Swiper>
      </div>
      <Popper
        sx={{ zIndex: 1200 }}
        open={open}
        anchorEl={anchorEl}
        placement="center"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ width: "80%", m: "auto" }}>
              {productid && <SinglePro productid={productid} />}
            </Paper>
          </Fade>
        )}
      </Popper>
      <Navbar setSearchQuery={setSearchQuery} />
      <Filter setSort={setSort} />
      <div className="products">
        {filterProducts().map((pro) => (
          <div className="product-card" key={pro.id}>
            <Toast className="x" ref={toastCenter} position="center" style={{color:"red"}} />
            <img
              className="product-image"
              src={pro.image}
              alt={pro.title}
              onClick={(e) => handleProductClick(e, pro.id)}
            />
            <p className="product-description">{pro.description}</p>
            <div className="addpro">
              <span>${pro.price}</span>
              <ShoppingCartIcon
                sx={{
                  color: m.palette.text.primary,
                  cursor: "pointer",
                  transition: "all 0.1s ease",
                  "&:hover": {
                    color: "lightgreen",
                    transform: "scale(1.2)",
                  },
                  "&:active": {
                    color: "green",
                    transform: "scale(0.9)",
                  },
                }}
                onClick={(e) => {
                  dispatch(addToCart(pro));
                  showMessage(toastCenter, "success");
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
