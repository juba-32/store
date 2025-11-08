import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

export default function Category({ setCategoryFilter }) {
  const [category, setCategory] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setCategory(value);         
    setCategoryFilter(value);    
    console.log("Category selected:", value);
  }
  return (
    <Box sx={{ minWidth: 320, width: "320px" }}>
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={"tv"}>TV</MenuItem>
          <MenuItem value={"mobile"}>Mobile</MenuItem>
          <MenuItem value={"audio"}>Audio</MenuItem>
          <MenuItem value={"gaming"}>Gaming</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
