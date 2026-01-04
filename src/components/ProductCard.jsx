import Button from "./Button";
import "../styles/components/ProductCard.css";

export default function ProductCard({ product }) {
  const {
    title,
    category,
    price,
    availabilityStatus,
    stock,
    thumbnail,
    images,
  } = product;

  const isOutOfStock = availabilityStatus === "Out of Stock" || stock === 0;
  let badgeClass = "badge-in-stock";
  if (isOutOfStock) {
    badgeClass = "badge-out-of-stock";
  }

  const handleAddToCart = () => {
    console.log(`Added to cart: ${title} (${product.id})`);
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
          <span className="product-price">${price.toFixed(2)}</span>
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            variant={isOutOfStock ? "outline" : "primary"}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </article>
  );
}
