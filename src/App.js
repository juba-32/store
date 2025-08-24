import { Route, Routes } from "react-router-dom";
import Cart from "./components/cart/Cart";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Tv from "./pages/Tv";
import Audio from "./pages/Audio";
import Mobile from "./pages/Mobile";
import Gaming from "./pages/Gaming";
import Product from "./pages/Product";
import Reg from "./components/register/Register";
import { darkTheme, lightTheme } from "./components/theme/Theme";
import { useSelector } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import SinglePro from "./components/singlePro/SinglePro";
function App() {
  const darkMode = useSelector((state) => state.cart.darkMode);
  return (
    
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="App">
        <Navbar  />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Reg />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
export default App;
