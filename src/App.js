import { Route, Routes } from "react-router-dom";
import Cart from "./cart/Cart";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Reg from "./components/register/Register";
import { darkTheme, lightTheme } from "./components/theme/Theme";
import { useSelector } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Footer from "./layout/footer/Footer";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Navbar from "./layout/navbar/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
function App() {
  const darkMode = useSelector((state) => state.cart.darkMode);
  const { i18n } = useTranslation();
  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="App">
        <Navbar backendUrl="https://amb.up.railway.app/products" />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Reg />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
export default App;
