import "./Footer.css";
import { IoIosArrowForward } from "react-icons/io";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import img from "../../assets/logo.webp";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const darkMode = useSelector((state) => state.cart.darkMode);
  const { t } = useTranslation();

  const quickLinks = [
    { label: t("navbar.TV"), path: "/tv" },
    { label: t("navbar.Audio"), path: "/audio" },
    { label: t("navbar.Mobile"), path: "/mobile" },
    { label: t("navbar.Gaming"), path: "/gaming" },
  ];

  return (
    <footer className={`footer ${darkMode ? "dark" : "light"}`}>
      <div className="footer-logo">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <img
                src={img}
                alt="logo"
              />
            </Link>
      </div>

      <div className="footer-sec">
        <h2>{t("footer.Customer Support")}</h2>
        <ul>
          <li><IoIosArrowForward /><p>{t("footer.About Us")}</p></li>
          <li><IoIosArrowForward /><p>{t("footer.Privacy Policy")}</p></li>
          <li><IoIosArrowForward /><p>{t("footer.Terms & Conditions")}</p></li>
          <li><IoIosArrowForward /><p>{t("footer.Product Returns")}</p></li>
        </ul>
      </div>

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

      <div className="social-links">
        <a href="facebook"><FaFacebookF /></a>
        <a href="twitter"><TiSocialTwitter /></a>
        <a href="linkedinin"><FaLinkedinIn /></a>
        <a href="youtube"><FaYoutube /></a>
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
