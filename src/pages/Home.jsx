import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import Sort from "../components/Sort";
import Filter from "../components/Filter";
import "../styles/Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const urlSearchQuery = searchParams.get("q") || "";
  const sortOrder = searchParams.get("order");

  const [searchTerm, setSearchTerm] = useState(urlSearchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (searchTerm.trim()) {
          newParams.set("q", searchTerm.trim());
        } else {
          newParams.delete("q");
        }
        return newParams;
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, setSearchParams]);

  useEffect(() => {
    if (urlSearchQuery !== searchTerm) {
      setSearchTerm(urlSearchQuery);
    }
  }, [urlSearchQuery]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const baseUrl = import.meta.env.VITE_REACT_API_URL;
        const response = await fetch(`${baseUrl}/products/category-list`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_REACT_API_URL;

        let url = `${baseUrl}/products`;
        const params = new URLSearchParams();
        params.append("limit", "15");

        if (selectedCategory) {
          url += `/category/${selectedCategory}`;
        } else if (urlSearchQuery) {
          url += `/search`;
          params.append("q", urlSearchQuery);
        }
        if (sortOrder && !urlSearchQuery) {
          params.append("sortBy", "price");
          params.append("order", sortOrder);
        }

        url += `?${params.toString()}`;

        const response = await fetch(url);
        const data = await response.json();

        let fetchedProducts = data.products || [];

        if (
          !selectedCategory &&
          !sortOrder &&
          !urlSearchQuery &&
          fetchedProducts.length > 1
        ) {
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
  }, [selectedCategory, sortOrder, urlSearchQuery]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
    setShowSort(false);
  };

  const toggleSort = () => {
    setShowSort(!showSort);
    setShowFilter(false);
  };

  const handleCategorySelect = (category) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (category) {
        newParams.set("category", category);
      } else {
        newParams.delete("category");
      }
      return newParams;
    });
    setShowFilter(false);
  };

  const handleSortSelect = (order) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (order) {
        newParams.set("order", order);
      } else {
        newParams.delete("order");
      }
      return newParams;
    });
    setShowSort(false);
  };

  let displayedProducts = products;

  if (selectedCategory && urlSearchQuery) {
    displayedProducts = products.filter((product) =>
      product.title.toLowerCase().includes(urlSearchQuery.toLowerCase())
    );
  }

  if (urlSearchQuery && sortOrder) {
    displayedProducts = [...displayedProducts].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  const handleClearAll = () => {
    setSearchTerm("");
    setSearchParams({});
    setShowFilter(false);
    setShowSort(false);
  };

  const hasActiveFilters = selectedCategory || urlSearchQuery || sortOrder;

  return (
    <div className="home-page">
      <div className="container controls-container">
        <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <div className="actions-wrapper">
          {hasActiveFilters && (
            <button className="clear-all-btn" onClick={handleClearAll}>
              Clear All
            </button>
          )}

          <Sort
            showSort={showSort}
            onToggle={toggleSort}
            sortOrder={sortOrder}
            onSortSelect={handleSortSelect}
          />

          <Filter
            showFilter={showFilter}
            onToggle={toggleFilter}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            categories={categories}
          />
        </div>
      </div>

      <section className="container product-grid-section">
        {loading ? (
          <div className="loading-state">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="product-grid">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="no-results">
                <p>No products found matching "{urlSearchQuery}".</p>
                <button className="btn btn-link" onClick={handleClearAll}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
