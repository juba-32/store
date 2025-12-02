import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton, Box, Modal } from "@mui/material";
import SinglePro from "../../components/singlePro/SinglePro";
import Category from "../../components/filter/Category";
import Price from "../../components/filter/Price";
import "../../styles/FetchData.css";
import { useTheme } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../toast/Toast";

export default function UseFetchData({ url }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const searchQuery = useSelector((state) => state.cart.searchQuery);

  const [open, setOpen] = useState(false);
  const [productid, setProductid] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState([0, 1000]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("info");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (categoryFilter) params.append("selectCategory", categoryFilter);
        if (priceFilter?.length === 2) {
          params.append("minPrice", priceFilter[0]);
          params.append("maxPrice", priceFilter[1]);
        }
        if (searchQuery) params.append("search", searchQuery);
        const fullUrl = `${url}?${params.toString()}`;
        console.log("Fetching products from:", fullUrl);
        const response = await axios.get(fullUrl);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url, categoryFilter, priceFilter, searchQuery]);

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
        <Price priceFilter={priceFilter} setPriceFilter={setPriceFilter} />
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