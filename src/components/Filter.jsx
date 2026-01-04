import { FiFilter, FiX } from "react-icons/fi";
import "../styles/components/Filter.css";

export default function Filter({
  showFilter,
  onToggle,
  selectedCategory,
  onCategorySelect,
  categories,
}) {
  return (
    <div className="dropdown-wrapper">
      <button
        className={`filter-toggle-btn ${showFilter ? "active" : ""}`}
        onClick={onToggle}
      >
        {showFilter ? <FiX /> : <FiFilter />}
        <span>
          {selectedCategory ? selectedCategory.replace("-", " ") : "Filter"}
        </span>
      </button>

      {showFilter && (
        <div className="category-dropdown">
          <button
            className={`category-chip ${!selectedCategory ? "active" : ""}`}
            onClick={() => onCategorySelect(null)}
          >
            All Items
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-chip ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => onCategorySelect(cat)}
            >
              {cat.replace("-", " ")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
