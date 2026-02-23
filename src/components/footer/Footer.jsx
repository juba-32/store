import "./Footer.css";
import { IoIosArrowForward } from "react-icons/io";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaApple, FaGooglePlay } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const darkMode = useSelector((state) => state.cart.darkMode);
  const { t } = useTranslation();

  const quickLinks = [
    { label: t("navbar.Home"), path: "/" },
    { label: t("navbar.Products"), path: "/product" },
    { label: t("navbar.About"), path: "/about" },
    { label: t("navbar.Contact"), path: "/contact" },
  ];

  return (
    <footer className={`footer ${darkMode ? "dark" : "light"}`}>
      
      {/* Logo */}
      <div className="footer-logo">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src="/images/logo.avif" alt="logo" />
        </Link>
      </div>

      {/* Customer Support */}
      <div className="footer-sec">
        <h2>{t("footer.Customer Support")}</h2>
        <ul>
          <li><IoIosArrowForward /><p>{t("footer.About Us")}</p></li>
          <li><IoIosArrowForward /><p>{t("footer.Privacy Policy")}</p></li>
          <li><IoIosArrowForward /><p>{t("footer.Terms & Conditions")}</p></li>
          <li><IoIosArrowForward /><p>{t("footer.Product Returns")}</p></li>
        </ul>
      </div>

      {/* Quick Links */}
      <div className="footer-sec">
        <h2>{t("footer.Quick Links")}</h2>
        <ul>
          {quickLinks.map((link, index) => (
            <li key={index} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <IoIosArrowForward />
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Subscription */}
      <div className="footer-sec">
        <h2>{t("footer.Subscribe")}</h2>
        <p className="footer-desc">
          {t("footer.Get updates, offers & news directly to your inbox.")}
        </p>

        <form className="subscribe-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">{t("footer.Subscribe")}</button>
        </form>

        {/* App Downloads */}
        <div className="app-download">
          <a href="#" aria-label="Android App">
            <FaGooglePlay />
            <span>Android</span>
          </a>
          <a href="#" aria-label="iOS App">
            <FaApple />
            <span>iOS</span>
          </a>
        </div>
      </div>

      {/* Social */}
      <div className="social-links">
        <a href="#"><FaFacebookF /></a>
        <a href="#"><TiSocialTwitter /></a>
        <a href="#"><FaLinkedinIn /></a>
        <a href="#"><FaYoutube /></a>
      </div>

      {/* Copyright */}
      <div className="copyright">
        <p>© <b>Ahmed Bendary</b> | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;