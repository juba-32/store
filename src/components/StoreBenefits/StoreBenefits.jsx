import "./StoreBenefits.css";
import { FaHandHoldingHeart } from "react-icons/fa";
export default function StoreBenefits() {
  return (
    <div className="advantages">
      <h2> <FaHandHoldingHeart /> Your advantages with nelly</h2>
      <ul>
        <li>
          <h3>Free shipping</h3>
          <p>For all orders from 99€</p>
        </li>
        <li>
          <h3>14 days return policy</h3>
          <p>Simply return what you don't like</p>
        </li>
        <li>
          <h3>Close to you</h3>
          <p>Inspiration in many stores across Europe</p>
        </li>
        <li>
          <h3>Excellent Customer Support</h3>
          <p>Our customer support is here for you</p>
        </li>
      </ul>
    </div>
  )
}
