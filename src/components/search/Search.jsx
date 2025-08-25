import SearchIcon from "@mui/icons-material/Search";
import { Box, InputBase, useTheme, useMediaQuery } from "@mui/material";
import "../search/Search.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/cartSlice";

export default function Search() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.cart.searchQuery);
  const handleSearchFilter = (e) => {
    dispatch(setSearchQuery(e.target.value.trim().toLowerCase()));
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const SearchInput = (
    <div className="search-container">
      <div className="search-icon-wrapper">
        <SearchIcon />
      </div>
      <InputBase
        className="search-input"
        placeholder="Search Products"
        value={searchQuery}
        onChange={handleSearchFilter}
      />
    </div>
  );
  return (
    <div>
      {!isMobile && SearchInput}

      {isMobile && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
          {SearchInput}
        </Box>
      )}

    
    </div>
  
  );
}
