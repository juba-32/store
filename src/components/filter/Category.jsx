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
