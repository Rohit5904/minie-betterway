import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/components/Header.css";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="container header-content">
        <a href="/" className="logo">
          Minie
        </a>
        <Link to="/cart" className="cart-btn" aria-label="Cart">
          <FiShoppingBag size={24} />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
      </div>
    </header>
  );
}
