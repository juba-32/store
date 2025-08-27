import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,

} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Filter({ setSort,  setSearchQuary }) {
    const {t} = useTranslation();

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };



  return (
    <div>
      {/* Sort Filter */}
      <FormControl sx={{ ml: "20px" }}>
        <RadioGroup row onChange={handleSortChange}>
          <FormControlLabel value="All" control={<Radio />} label={t("sort.all" )}/>
          <FormControlLabel value="Cheap" control={<Radio />} label={t("sort.sheap")} />
          <FormControlLabel
            value="Expensive"
            control={<Radio />}
            label={t("sort.expensive")}
          />
          <FormControlLabel value="Sale" control={<Radio />} label={t("sort.sale")} />
        </RadioGroup>
      </FormControl>

    
    </div>
  );
}
