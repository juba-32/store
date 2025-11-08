import React, { useState } from "react";
import { Slider, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Price({ setSort }) {
  const { t } = useTranslation();
  const [price, setPrice] = useState([0, 1000]);

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const handlePriceCommit = (event, newValue) => {
    setSort({ min: newValue[0], max: newValue[1] });
  };

  return (
    <Box sx={{ width: 250, m:"0 20px" }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
        {t("sort.price")}
      </Typography>

      <Slider
        value={price}
        onChange={handlePriceChange}
        onChangeCommitted={handlePriceCommit}
        valueLabelDisplay="auto"
        step={50}
        min={0}
        max={1000}
        sx={{ color: "gray"}}
      />

      <Typography variant="body2" color="text.secondary">
         ${price[0]} – ${price[1]}
      </Typography>
    </Box>
  );
}
