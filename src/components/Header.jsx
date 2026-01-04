import { FiShoppingBag } from "react-icons/fi";
import "../styles/components/Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <a href="/" className="logo">
          Minie
        </a>
        <button className="cart-btn" aria-label="Cart">
          <FiShoppingBag size={24} />
        </button>
      </div>
    </header>
  );
}
