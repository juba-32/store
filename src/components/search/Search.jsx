import SearchIcon from "@mui/icons-material/Search";
import { Box, InputBase, useTheme, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/cartSlice";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function Search() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const globalSearch = useSelector((state) => state.cart.searchQuery);
  const [localQuery, setLocalQuery] = useState(globalSearch);

  // 🧠 Debounce input to prevent API spam
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(localQuery.trim().toLowerCase()));
    }, 500); // waits 500ms after user stops typing
    return () => clearTimeout(timer);
  }, [localQuery, dispatch]);

  const handleChange = (e) => setLocalQuery(e.target.value);

  const SearchInput = (
    <Box className="search-container">
      <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 0.5, bgcolor: "background.paper", borderRadius: 1}}>
        <SearchIcon sx={{color:"gray"}}/>
      <InputBase
        className="search-input"
        placeholder={t("search.Search Products")}
        value={localQuery}
        onChange={handleChange}
        inputProps={{
          "aria-label": t("search.Search Products"),
          maxLength: 50, // 🧩 small safeguard
        }}
      />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", justifyContent: isMobile ? "center" : "flex-start", py: isMobile ? 1 : 0 }}>
      {SearchInput}
    </Box>
  );
}