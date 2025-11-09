import { useState, useEffect } from "react";
import { Box, InputBase, Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, ClickAwayListener, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function DropdownSearchInput({ backendUrl }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setOpenDropdown(false);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("search", debouncedQuery);
        params.append("limit", 5);
        const response = await axios.get(`${backendUrl}?${params.toString()}`);
        setResults(response.data);
        setOpenDropdown(true);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedQuery, backendUrl]);

  const handleClickAway = () => setOpenDropdown(false);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: "relative", width: { xs: "100%", sm: 300 } }}>
        <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 0.5, bgcolor: "background.paper", borderRadius: 1 }}>
          <SearchIcon />
          <InputBase
            fullWidth
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => debouncedQuery && setOpenDropdown(true)}
          />
          {loading && <CircularProgress size={20} sx={{ ml: 1 }} />}
        </Box>

        {openDropdown && results.length > 0 && (
          <Paper sx={{ position: "absolute", top: "100%", left: 0, right: 0, mt: 1, zIndex: 10, maxHeight: 300, overflowY: "auto", boxShadow: 3 }}>
            <List>
              {results.map((product) => (
                <ListItem key={product._id} button onClick={() => navigate(`/products/${product._id}`)}>
                  <ListItemAvatar>
                    <Avatar src={product.image} variant="square" sx={{ width: 50, height: 50 }} />
                  </ListItemAvatar>
                  <ListItemText primary={product.title} secondary={`$${product.price}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
}
