import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,

} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function Filter({ setSort,  setSearchQuary }) {
  const dispatch = useDispatch();
  // const { selectedCategory, searchQuery } = useSelector((state) => state.cart);
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  //   const handleCategoryChange = (e) => {
  //   dispatch(setCategory(e.target.value));
  // };

  // const handleSearchChange = (e) => {
  //   dispatch(setSearchQuery(e.target.value));
  // };

  return (
    <div>
      {/* Sort Filter */}
      <FormControl sx={{ ml: "20px" }}>
        <RadioGroup row onChange={handleSortChange}>
          <FormControlLabel value="All" control={<Radio />} label="All" />
          <FormControlLabel value="Cheap" control={<Radio />} label="Cheap" />
          <FormControlLabel
            value="Expensive"
            control={<Radio />}
            label="Expensive"
          />
          <FormControlLabel value="Sale" control={<Radio />} label="Sale" />
        </RadioGroup>
      </FormControl>

    
    </div>
  );
}
