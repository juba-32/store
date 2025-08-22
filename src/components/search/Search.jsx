import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { useTheme, useMediaQuery, Box, InputBase } from "@mui/material";

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.text.primary, 0.15),
  "&:hover, &:focus-within": {
    backgroundColor: alpha(theme.palette.text.primary, 0.25),
    border: "1px solid rgb(121, 203, 118)",
  },
  width: "100%",
  maxWidth: "500px",
  display: "flex",
  alignItems: "center",
  padding: "5px 10px",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    margin: "10px auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.primary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  flexGrow: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    width: "100%",
  },
}));

export default function Search({ setSearchQuery }) {
  const handleSearchFilter = (e) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div>
      {!isMobile && (
        <SearchContainer>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search Products"
            onChange={handleSearchFilter}
          />
        </SearchContainer>
      )}

      {isMobile && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Products"
              onChange={handleSearchFilter}
            />
          </SearchContainer>
        </Box>
      )}
    </div>
  );
}
