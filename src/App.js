import { Route, Routes } from "react-router-dom";
import Cart from "./cart/Cart";
import Home from "./pages/home/Home";
import Reg from "./components/register/Register";
import { darkTheme, lightTheme } from "./components/theme/Theme";
import { useSelector } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Footer from "./components/footer/Footer";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Navbar from "./components/navbar/Navbar";
import Products from "./pages/products/Products";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Checkout from "./pages/Checkout";
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
        <Navbar backendUrl="https://node-api-projects.vercel.app/products" />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path="/Products" element={<Products url = {"https://node-api-projects.vercel.app/products"} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Reg />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
export default App;
