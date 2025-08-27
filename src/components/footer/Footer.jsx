import "./Footer.css";
import { IoIosArrowForward } from "react-icons/io";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import img from "../../assets/r.png";
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
        <img src={img} alt="logo" />
      </div>

      <div className="footer-sec">
        <h3>{t("footer.Customer Support")}</h3>
        <ul>
          <li><IoIosArrowForward /><p>{t("footer.About Us")}</p></li>
          <li><IoIosArrowForward /><p>{t("footer.Privacy Policy")}</p></li>
          <li><IoIosArrowForward /><p>{t("footer.Terms & Conditions")}</p></li>
          <li><IoIosArrowForward /><p>{t("footer.Product Returns")}</p></li>
        </ul>
      </div>

      <div className="footer-sec">
        <h3>{t("footer.Quick Links")}</h3>
        <ul>
          {quickLinks.map((link, index) => (
            <li key={index}>
              <IoIosArrowForward />
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
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
