import "./Footer.css";
import { IoIosArrowForward } from "react-icons/io";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import img from "../../assets/r.png";
import { useSelector } from "react-redux";

const Footer = () => {
  const darkMode = useSelector((state) => state.cart.darkMode); // read global dark mode

  return (
    <footer className={`footer ${darkMode ? "dark" : "light"}`}>
      <div className="footer-logo">
        <img src={img} alt="logo" />
      </div>

      <div className="footer-sec">
        <h3>Customer Support</h3>
        <ul>
          <li><IoIosArrowForward /><p>About Us</p></li>
          <li><IoIosArrowForward /><p>Privacy Policy</p></li>
          <li><IoIosArrowForward /><p>Terms & Conditions</p></li>
          <li><IoIosArrowForward /><p>Product Returns</p></li>
        </ul>
      </div>

      <div className="footer-sec">
        <h3>Quick Links</h3>
        <ul>
          <li><IoIosArrowForward /><p>Product</p></li>
          <li><IoIosArrowForward /><p>Profile</p></li>
          <li><IoIosArrowForward /><p>Contact</p></li>
          <li><IoIosArrowForward /><p>Terms</p></li>
        </ul>
      </div>

      <div className="social-links">
        <a href="#"><FaFacebookF /></a>
        <a href="#"><TiSocialTwitter /></a>
        <a href="#"><FaLinkedinIn /></a>
        <a href="#"><FaYoutube /></a>
      </div>

      <div className="copyright">
        <p>
          © <b>Ahmed Bendary</b> | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
