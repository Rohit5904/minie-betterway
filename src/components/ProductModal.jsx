import { FiX, FiStar, FiMinus, FiPlus } from "react-icons/fi";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import Button from "./Button";
import "../styles/components/ProductModal.css";

export default function ProductModal({ product, isOpen, onClose }) {
  if (!isOpen || !product) return null;

  const {
    id,
    title = "Unknown Product",
    category = "General",
    price = 0,
    discountPercentage = 0,
    rating = 0,
    stock = 0,
    brand = "Generic",
    description = "No description available.",
    warrantyInformation = "N/A",
    shippingInformation = "N/A",
    availabilityStatus = "Unknown",
    reviews = [],
    images = [],
    thumbnail = "",
    dimensions = {},
  } = product;

  const { width = 0, height = 0, depth = 0 } = dimensions || {};

  const { addToCart, cart, updateQuantity } = useCart();
  const cartItem = cart.find((item) => item.id === id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = availabilityStatus === "Out of Stock" || stock === 0;

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

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
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FiX />
        </button>

        <div className="modal-content">
          <section className="modal-image-section">
            <div className="modal-main-image-container">
              <img
                src={
                  images[0] || thumbnail || "https://via.placeholder.com/400"
                }
                alt={title}
                className="modal-main-image"
              />
            </div>

            <div className="modal-price-actions">
              <div className="modal-price-row">
                <span className="modal-price">Rs {price.toFixed(2)}</span>
                {discountPercentage > 0 && (
                  <span className="modal-discount">-{discountPercentage}%</span>
                )}
              </div>

              {quantityInCart > 0 ? (
                <div className="modal-qty-controls">
                  <button className="modal-qty-btn" onClick={handleDecrement}>
                    <FiMinus />
                  </button>
                  <span className="modal-qty-value">{quantityInCart}</span>
                  <button className="modal-qty-btn" onClick={handleIncrement}>
                    <FiPlus />
                  </button>
                </div>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  variant={isOutOfStock ? "outline" : "primary"}
                  style={{ width: "100%" }}
                >
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>
              )}
            </div>
          </section>

          <section className="modal-details-section">
            <span className="modal-category">{category}</span>
            <h2 className="modal-title">{title}</h2>

            <div className="modal-brand-sku">
              <span>Brand: {brand}</span>
              <div className="modal-rating">
                <FiStar fill="orange" stroke="none" />
                <span>{rating.toFixed(1)}</span>
              </div>
            </div>

            <div
              className={`product-badge ${
                stock > 0 ? "badge-in-stock" : "badge-out-of-stock"
              }`}
              style={{
                alignSelf: "flex-start",
                position: "static",
                marginBottom: "1rem",
              }}
            >
              {availabilityStatus}
            </div>

            <p className="modal-description">{description}</p>

            <div className="modal-meta-grid">
              <div className="meta-item">
                <span className="meta-label">Dimensions (cm)</span>
                <span className="meta-value">
                  {width}W x {height}H x {depth}D
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Warranty</span>
                <span className="meta-value">{warrantyInformation}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Shipping</span>
                <span className="meta-value">{shippingInformation}</span>
              </div>
            </div>

            {reviews.length > 0 && (
              <div className="modal-reviews">
                <h3 className="reviews-title">Customer Reviews</h3>
                <div className="review-list">
                  {reviews.slice(0, 3).map((review, index) => (
                    <div key={index} className="review-item">
                      <div className="review-header">
                        <span className="reviewer-name">
                          {review.reviewerName || "Anonymous"}
                        </span>
                        <span style={{ color: "orange" }}>
                          ★ {review.rating}
                        </span>
                      </div>
                      <p className="review-comment">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
