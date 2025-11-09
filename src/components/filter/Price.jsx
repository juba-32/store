import { Box, Slider, Typography } from "@mui/material";

export default function Price({ priceFilter, setPriceFilter }) {
  const handleChange = (_, newValue) => {
    setPriceFilter(newValue); 
    console.log("💰 Price range selected:", newValue);
  };

  return (
    <Box sx={{ width: 320 }}>
      <Typography gutterBottom>Price Range (${priceFilter[0]} - ${priceFilter[1]})</Typography>
      <Slider
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
