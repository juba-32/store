import "./StoreBenefits.css";
import { FaHandHoldingHeart } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { PiKeyReturnFill } from "react-icons/pi";
import { HiMiniPhoneArrowUpRight } from "react-icons/hi2";

export default function StoreBenefits() {
  return (
    <div className="advantages">
      <h2> <FaHandHoldingHeart className="benefit-icon" /> Your advantages with nelly</h2>
      <ul>
        <li>
          <h3> <MdLocalShipping className="benefit-icon" /> Free shipping</h3>
          <p>For all orders from 99€</p>
        </li>
        <li>
          <h3> <PiKeyReturnFill className="benefit-icon" /> 14 days return policy</h3>
          <p>Simply return what you don't like</p>
        </li>
        <li>
          <h3> <FaHandHoldingHeart className="benefit-icon" /> Close to you</h3>
          <p>Inspiration in many stores across Europe</p>
        </li>
        <li>
          <h3> <HiMiniPhoneArrowUpRight className="benefit-icon" /> Excellent Customer Support</h3>
          <p>Our customer support is here for you</p>
        </li>
      </ul>
    </div>
  )
}
