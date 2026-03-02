import { useEffect, useState } from "react";
import {
  Box,
  InputBase,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ClickAwayListener,
  CircularProgress,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../../redux/cartSlice";
import axios from "axios";
import { useTranslation } from "react-i18next";
import useModal from "../../../hooks/useModal";
import SinglePro from "../../../pages/products/product Model/SinglePro";
import "./Search.css";
import { useLocation } from "react-router-dom";
import useCartActions from "../../../hooks/useCartActions";
import useToast from "../../../hooks/useToast";
import Toast from "../../toast/Toast";

export default function Search({ mode = "global", backendUrl }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const { open, productId, openModal, closeModal } = useModal();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { toastOpen, toastMessage, toastSeverity, showToast, closeToast } =
    useToast();
  const { handleAddToCart } = useCartActions(showToast);
  useEffect(() => {
    if (location.pathname.startsWith("/products")) {
      setQuery("");
      setDebouncedQuery("");
      setResults([]);
      setOpenDropdown(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (mode === "products") {
      dispatch(setSearchQuery(debouncedQuery));
    }
  }, [debouncedQuery, mode, dispatch]);

  useEffect(() => {
    if (mode !== "global" || !debouncedQuery) {
      setResults([]);
      setOpenDropdown(false);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          search: debouncedQuery,
          limit: 6,
        });

        const res = await axios.get(`${backendUrl}?${params}`);
        setResults(res.data);
        setOpenDropdown(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedQuery, mode, backendUrl]);

  return (
    <>
      {productId && (
        <SinglePro
          open={open}
          handleClose={closeModal}
          productid={productId}
          handleAddToCart={handleAddToCart}
        />
      )}

      <ClickAwayListener onClickAway={() => setOpenDropdown(false)}>
        <Box className="search-wrapper">
          <Box className="search-input">
            <SearchIcon className="search-icon" />
            <InputBase
              className="search-field"
              placeholder={t("search.Search Products")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => debouncedQuery && setOpenDropdown(true)}
            />
            {loading && <CircularProgress size={18} />}
          </Box>

          {mode === "global" && openDropdown && results.length > 0 && (
            <Paper className="search-dropdown">
              <List>
                {results.map((product) => (
                  <ListItem
                    key={product._id}
                    className="search-item"
                    onClick={() => {
                      openModal(product._id);
                      setOpenDropdown(false);
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={product.image}
                        variant="rounded"
                        className="search-avatar"
                      />
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Typography className="search-title">
                          {product.title}
                        </Typography>
                      }
                      secondary={
                        <Typography className="search-price">
                          ${product.price}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      </ClickAwayListener>
      <Toast
        open={toastOpen}
        onClose={closeToast}
        message={toastMessage}
        severity={toastSeverity}
      />
    </>
  );
}
