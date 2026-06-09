import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../redux/cartSlice';
import { useTranslation } from 'react-i18next'; // 💡 استيراد مكتبة الترجمة

export default function Category() {
  const { t, i18n } = useTranslation(); // 💡 تفعيل خطاف الترجمة
  const currentLang = i18n.language || "en"; // معرفة اللغة الحالية لإدارة اتجاه النصوص (RTL) لو لزم الأمر
  
  const category = useSelector((state) => state.cart.category);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const value = event.target.value;
    dispatch(setCategory(value));   
  };

  return (
    <Box 
      sx={{ 
        minWidth: 300, 
        width: "300px", 
        mt: "20px",
        /* 💡 تنسيق مخصص باللون الـ Cyan عند التفاعل مع المكون */
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "#00ffff", // لون سيان مضيء عند التركيز
          },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#00ffff", // لون التسمية السيان عند التركيز
        }
      }}
    >
      <FormControl fullWidth style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
        <InputLabel id="category-select-label">
          {t ? t("Category.category_label") : "Category"}
        </InputLabel>
        
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          label={t ? t("Category.category_label") : "Category"}
          onChange={handleChange}
          sx={{
            textAlign: currentLang === "ar" ? "right" : "left",
          }}
        >
          <MenuItem value={""}>{t ? t("Category.all_categories") : "All"}</MenuItem>
          <MenuItem value={"tv"}>{t ? t("Category.cat_tv") : "TV"}</MenuItem>
          <MenuItem value={"mobile"}>{t ? t("Category.cat_mobile") : "Mobile"}</MenuItem>
          <MenuItem value={"audio"}>{t ? t("Category.cat_audio") : "Audio"}</MenuItem>
          <MenuItem value={"gaming"}>{t ? t("Category.cat_gaming") : "Gaming"}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}