import SearchIcon from "@mui/icons-material/Search";
import { Box, InputBase, useTheme, useMediaQuery } from "@mui/material";
import "../search/Search.css";

export default function Search({ setSearchQuery }) {
  const handleSearchFilter = (e) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      {!isMobile && (
        <div className="search-container">
          <div className="search-icon-wrapper">
            <SearchIcon />
          </div>
          <InputBase
            className="search-input"
            placeholder="Search Products"
            onChange={handleSearchFilter}
          />
        </div>
      )}

      {isMobile && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
          <div className="search-container">
            <div className="search-icon-wrapper">
              <SearchIcon />
            </div>
            <InputBase
              className="search-input"
              placeholder="Search Products"
              onChange={handleSearchFilter}
            />
          </div>
        </Box>
      )}
    </div>
  );
}
