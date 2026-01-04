import { FiMinus, FiPlus } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import Button from "./Button";
import "../styles/components/ProductCard.css";

export default function ProductCard({ product }) {
  const {
    id,
    title,
    category,
    price,
    availabilityStatus,
    stock,
    thumbnail,
    images,
  } = product;

  const { addToCart, cart, updateQuantity } = useCart();

  const cartItem = cart.find((item) => item.id === id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const isOutOfStock = availabilityStatus === "Out of Stock" || stock === 0;
  let badgeClass = "badge-in-stock";
  if (isOutOfStock) {
    badgeClass = "badge-out-of-stock";
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleIncrement = () => {
    if (quantityInCart < stock) {
      updateQuantity(id, quantityInCart + 1, stock);
    } else {
      alert("Cannot add more items. Stock limit reached.");
    }
  };

  const handleDecrement = () => {
    if (quantityInCart === 1) {
      if (window.confirm("Do you want to remove this item from the cart?")) {
        updateQuantity(id, 0, stock);
      }
    } else {
      updateQuantity(id, quantityInCart - 1, stock);
    }
  };

  return (
    <article className="product-card">
      <div className="product-image-container">
        <span className={`product-badge ${badgeClass}`}>
          {isOutOfStock ? "Out of Stock" : availabilityStatus}
        </span>
        <img
          src={thumbnail || images[0]}
          alt={title}
          className="product-image"
          loading="lazy"
        />
      </div>

      <div className="product-content">
        <span className="product-category">{category}</span>
        <h3 className="product-title" title={title}>
          {title}
        </h3>

        <div className="product-footer">
          <span className="product-price">Rs {price.toFixed(2)}</span>

          {quantityInCart > 0 ? (
            <div className="card-qty-controls">
              <button
                className="card-qty-btn"
                onClick={handleDecrement}
                aria-label="Decrease quantity"
              >
                <FiMinus />
              </button>
              <span className="card-qty-value">{quantityInCart}</span>
              <button
                className="card-qty-btn"
                onClick={handleIncrement}
                aria-label="Increase quantity"
              >
                <FiPlus />
              </button>
            </div>
          ) : (
            <Button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              variant={isOutOfStock ? "outline" : "primary"}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
