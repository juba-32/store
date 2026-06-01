import "./Footer.css";
import { IoIosArrowForward } from "react-icons/io";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
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
      <div className="footer-content">
        {/* Brand */}
        <div className="footer-section brand-section">
          <Link
            to="/"
            className="footer-logo"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          >
            <img src="/images/logo.avif" alt="N Store Logo" />
          </Link>
          <div className="social-links">
            <a
              href="#facebook"
              className="facebook"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="#twitter"
              className="twitter"
              aria-label="Twitter"
            >
              <TiSocialTwitter />
            </a>

            <a
              href="#linkedin"
              className="linkedin"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="#youtube"
              className="youtube"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h3>{t("footer.Customer Support")}</h3>

          <ul>
            <li>
              <IoIosArrowForward />
              <Link to="/about">
                {t("footer.About Us")}
              </Link>
            </li>

            <li>
              <IoIosArrowForward />
              <Link to="/">
                {t("footer.Privacy Policy")}
              </Link>
            </li>

            <li>
              <IoIosArrowForward />
              <Link to="/">
                {t("footer.Terms & Conditions")}
              </Link>
            </li>

            <li>
              <IoIosArrowForward />
              <Link to="/">
                {t("footer.Product Returns")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>{t("footer.Quick Links")}</h3>

          <ul>
            {quickLinks.map((link, index) => (
              <li key={index}>
                <IoIosArrowForward />

                <Link
                  to={link.path}
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3>{t("footer.Subscribe")}</h3>

          <p className="footer-description">
            {t(
              "footer.Get updates, offers & news directly to your inbox."
            )}
          </p>

          <form className="subscribe-form">
            <input
              type="email"
              placeholder="Enter your email"
              required
            />

            <button type="submit">
              {t("footer.Subscribe")}
            </button>
          </form>

          <div className="app-download">
            <a href="#android">
              <FaGooglePlay />
              <span>Android</span>
            </a>

            <a href="#ios">
              <FaApple />
              <span>iOS</span>
            </a>
          </div>
        </div>
      </div>

      <div className="copyright">
        © {new Date().getFullYear()} <b>Ahmed Bendary</b> |
        All Rights Reserved
      </div>
    </footer>
  );
}