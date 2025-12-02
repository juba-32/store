import { Box, Slider, Typography } from "@mui/material";

export default function Price({ priceFilter, setPriceFilter }) {
  const handleChange = (_, newValue) => {
    setPriceFilter(newValue); 
  };

  return (
    <Box sx={{ width: 300, mt:"20px" }}>
      <Typography gutterBottom>Price  (${priceFilter[0]} - ${priceFilter[1]})</Typography>
      <Slider sx={{color:"gray"}}
        value={priceFilter}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
        step={50}
      />
    </Box>
  );
}
