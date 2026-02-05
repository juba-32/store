import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../redux/cartSlice';
export default function Category( ) {
  const category = useSelector((state) => state.cart.category);
  const dispatch = useDispatch()
  const handleChange = (event) => {
    const value = event.target.value;
    dispatch(setCategory(value));   
  }
  return (
    <Box sx={{ minWidth: 300, width: "300px",mt:"20px" }}>
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={""}>All</MenuItem>
          <MenuItem value={"tv"}>TV</MenuItem>
          <MenuItem value={"mobile"}>Mobile</MenuItem>
          <MenuItem value={"audio"}>Audio</MenuItem>
          <MenuItem value={"gaming"}>Gaming</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
