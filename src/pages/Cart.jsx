import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Button from "../components/Button";
import "../styles/Cart.css";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className="container cart-page">
        <h1 className="cart-title">Shopping Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/products">
            <Button variant="primary">Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h1 className="cart-title">Shopping Cart ({totalItems} items)</h1>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={
                item.thumbnail ||
                (item.images && item.images[0]) ||
                "https://via.placeholder.com/80"
              }
              alt={item.title}
              className="cart-item-thumbnail"
            />

            <div className="cart-item-details">
              <h3 className="cart-item-title">{item.title}</h3>
              <p className="cart-item-price">
                Rs {item.price?.toFixed(2) || "0.00"}
              </p>
            </div>

            <div className="cart-item-controls">
              <div className="quantity-controls">
                <button
                  className="qty-btn"
                  onClick={() => {
                    if (item.quantity === 1) {
                      if (window.confirm("Do you want to remove this item?")) {
                        updateQuantity(item.id, 0, item.stock);
                      }
                    } else {
                      updateQuantity(item.id, item.quantity - 1, item.stock);
                    }
                  }}
                  aria-label="Decrease quantity"
                >
                  <FiMinus size={14} />
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => {
                    if (item.quantity < item.stock) {
                      updateQuantity(item.id, item.quantity + 1, item.stock);
                    } else {
                      alert(
                        `Cannot add more. Stock limit for ${item.title} reached.`
                      );
                    }
                  }}
                  aria-label="Increase quantity"
                >
                  <FiPlus size={14} />
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this item from the cart?"
                    )
                  ) {
                    removeFromCart(item.id);
                  }
                }}
                aria-label="Remove item"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total-row">
          <span>Subtotal</span>
          <span>Rs {totalPrice.toFixed(2)}</span>
        </div>
        <div className="cart-total-row total">
          <span>Total</span>
          <span>Rs {totalPrice.toFixed(2)}</span>
        </div>
        <Button variant="primary" className="checkout-btn">
          Checkout
        </Button>
      </div>
    </div>
  );
}
