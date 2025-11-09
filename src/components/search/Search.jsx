import { useState, useEffect } from "react";
import { Box, InputBase, Paper, List, ListItem, ListItemButton, Typography, Avatar, useTheme, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/cartSlice";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NavbarSearch({ apiUrl }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const globalSearch = useSelector((state) => state.cart.searchQuery);
  const [localQuery, setLocalQuery] = useState(globalSearch);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Update global search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(localQuery.trim().toLowerCase()));
    }, 300);
    return () => clearTimeout(timer);
  }, [localQuery, dispatch]);

  // Fetch backend results dynamically
  useEffect(() => {
    if (!localQuery) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = new URL(apiUrl, window.location.origin);
        url.searchParams.set("search", localQuery);
        url.searchParams.set("limit", 10);

        const res = await axios.get(url.toString());
        setResults(res.data);
        setShowDropdown(true);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 300); // debounce backend call
    return () => clearTimeout(timer);
  }, [localQuery, apiUrl]);

  const handleSelect = (productId) => {
    setShowDropdown(false);
    navigate(`/products/${productId}`);
  };

  return (
    <Box sx={{ position: "relative", width: isMobile ? "90%" : 400, mx: "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Box sx={{ p: 1 }}>
          <SearchIcon />
        </Box>
        <InputBase
          placeholder={t("search.Search Products")}
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          fullWidth
        />
      </Box>

      {showDropdown && results.length > 0 && (
        <Paper sx={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 10, maxHeight: 400, overflowY: "auto" }}>
          <List>
            {results.map((product) => (
              <ListItem key={product._id} disablePadding>
                <ListItemButton onClick={() => handleSelect(product._id)} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar variant="rounded" src={product.image} sx={{ width: 50, height: 50 }} />
                  <Box>
                    <Typography variant="body2">{product.title}</Typography>
                    <Typography variant="caption" color="text.secondary">${product.price}</Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {showDropdown && results.length === 0 && !loading && (
        <Paper sx={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 10 }}>
          <ListItem>
            <Typography sx={{ p: 1 }}>No products found</Typography>
          </ListItem>
        </Paper>
      )}
    </Box>
  );
}
