import SearchIcon from "@mui/icons-material/Search";
import { Box, InputBase} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../../redux/cartSlice";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function Search() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const globalSearch = useSelector((state) => state.cart.searchQuery);
  const [localQuery, setLocalQuery] = useState(globalSearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(localQuery.trim().toLowerCase()));
    }, 500);
    return () => clearTimeout(timer);
  }, [localQuery, dispatch]);

  const handleChange = (e) => setLocalQuery(e.target.value);

  const SearchInput = (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 0.5,
          bgcolor: "background.paper",
        }}
      >
        <SearchIcon sx={{ color: "gray" }} />
        <InputBase
          sx={{ flex: 1 }}
          placeholder={t("search.Search Products")}
          value={localQuery}
          onChange={handleChange}
          inputProps={{
            "aria-label": t("search.Search Products"),
            maxLength: 50,
          }}
        />
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 1,
        width:"100%"
      }}
    >
      {SearchInput}
    </Box>
  );
}
