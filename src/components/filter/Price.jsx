import { Box, Slider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Price({ priceFilter, setPriceFilter }) {
  const { t, i18n } = useTranslation();  
  const currentLang = i18n.language || "en";

  const handleChange = (_, newValue) => {
    setPriceFilter(newValue); 
  };

  return (
    <Box sx={{ width: 300, mt: "20px" }}>
      <Typography 
        gutterBottom 
        style={{ 
          direction: currentLang === "ar" ? "rtl" : "ltr",
          textAlign: currentLang === "ar" ? "right" : "left" 
        }}
      >
        {t ? t("Price.price_filter_label") : "Price"} (${priceFilter[0]} - ${priceFilter[1]})
      </Typography>
      
      <Slider 
        sx={{
          color: "#00ffff",   
          "& .MuiSlider-thumb": {
            "&:hover, &.Mui-focusVisible": {
              boxShadow: "0px 0px 0px 8px rgba(0, 255, 255, 0.16)",
            },
            "&.Mui-active": {
              boxShadow: "0px 0px 0px 14px rgba(0, 255, 255, 0.24)",
            },
          },
          "& .MuiSlider-rail": {
            color: "#ccc",
          }
        }}
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