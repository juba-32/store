import { Route, Routes } from "react-router-dom";
import Cart from "./pages/cart/Cart";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
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
import Checkout from "./pages/checkout/Checkout";
import Orders from "./pages/orders/Orders";
import UserProfile from "./pages/UserProfile";
import Favorites from "./pages/favorites/Favorites";
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
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
export default App;
