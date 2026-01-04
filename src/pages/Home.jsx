import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_REACT_API_URL;
        const url = `${baseUrl}/products`;

        const response = await fetch(url);

        const data = await response.json();

        let fetchedProducts = data.products || [];
        if (fetchedProducts.length > 1) {
          fetchedProducts[1] = {
            ...fetchedProducts[1],
            stock: 0,
            availabilityStatus: "Out of Stock",
          };
        }

        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="home-page container">
        <div className="loading-state">
          <div className="loader"></div>
          <p>Loading curated items...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="home-page">
      <section className="container product-grid-section">
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
